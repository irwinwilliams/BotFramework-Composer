// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import formatMessage from 'format-message';
import { Diagnostic } from '@bfc/shared';
import { useRecoilValue } from 'recoil';
import { OpenConfirmModal } from '@bfc/ui-shared';
import { useSetRecoilState } from 'recoil';
import React from 'react';

import { DialogDeleting } from '../../constants';
import { createSelectedPath, deleteTrigger as DialogdeleteTrigger } from '../../utils/dialogUtil';
import { dialogStyle } from '../../components/Modal/dialogStyle';
import { ProjectTree, TreeLink } from '../../components/ProjectTree/ProjectTree';
import { navigateTo, createBotSettingUrl } from '../../utils/navigation';
import {
  dispatcherState,
  dialogsSelectorFamily,
  projectDialogsMapSelector,
  designPageLocationState,
  triggerModalInfoState,
  brokenSkillInfoState,
  dialogModalInfoState,
  showAddSkillDialogModalState,
  rootBotProjectIdSelector,
  currentDialogState,
} from '../../recoilModel';
import { undoFunctionState } from '../../recoilModel/undo/history';
import { decodeDesignerPathToArrayPath } from '../../utils/convertUtils/designerPathEncoder';
import { CreationFlowStatus } from '../../constants';
import { useBotOperations } from '../../components/BotRuntimeController/useBotOperations';
import { exportSkillModalInfoState } from '../../recoilModel/atoms/appState';
import TelemetryClient from '../../telemetry/TelemetryClient';

import { deleteDialogContent } from './styles';

function onRenderContent(subTitle, style) {
  return (
    <div css={deleteDialogContent}>
      <p>{DialogDeleting.CONTENT}</p>
      {subTitle && <div style={style}>{subTitle}</div>}
      <p>{DialogDeleting.CONFIRM_CONTENT}</p>
    </div>
  );
}

function getAllRef(targetId, dialogs) {
  let refs: string[] = [];
  dialogs.forEach((dialog) => {
    if (dialog.id === targetId) {
      refs = refs.concat(dialog.referredDialogs);
    } else if (!dialog.referredDialogs.every((item) => item !== targetId)) {
      refs.push(dialog.displayName || dialog.id);
    }
  });
  return refs;
}

const parseTriggerId = (triggerId: string | undefined): number | undefined => {
  if (triggerId == null) return undefined;
  const indexString = triggerId.match(/\d+/)?.[0];
  if (indexString == null) return undefined;
  return parseInt(indexString);
};

type SideBarProps = { dialogId: string; projectId: string };

const SideBar: React.FC<SideBarProps> = ({ dialogId, projectId }) => {
  const currentDialog = useRecoilValue(currentDialogState({ dialogId, projectId }));
  const dialogs = useRecoilValue(dialogsSelectorFamily(projectId));
  const projectDialogsMap = useRecoilValue(projectDialogsMapSelector);
  const { startSingleBot, stopSingleBot } = useBotOperations();
  const undoFunction = useRecoilValue(undoFunctionState(projectId));
  const rootProjectId = useRecoilValue(rootBotProjectIdSelector);
  const { commitChanges } = undoFunction;
  const designPageLocation = useRecoilValue(designPageLocationState(projectId));

  const {
    removeDialog,
    updateDialog,
    createDialogBegin,
    navTo,
    selectTo,
    exportToZip,
    setCreationFlowStatus,
    setCreationFlowType,
    removeSkillFromBotProject,
    updateZoomRate,
    deleteTrigger,
  } = useRecoilValue(dispatcherState);

  const selected = decodeDesignerPathToArrayPath(
    dialogs.find((x) => x.id === dialogId)?.content,
    designPageLocation.selected || ''
  );

  const setTriggerModalInfo = useSetRecoilState(triggerModalInfoState);

  const setDialogModalInfo = useSetRecoilState(dialogModalInfoState);
  const setExportSkillModalInfo = useSetRecoilState(exportSkillModalInfoState);
  const setBrokenSkillInfo = useSetRecoilState(brokenSkillInfoState);
  const setAddSkillDialogModalVisibility = useSetRecoilState(showAddSkillDialogModalState);

  function handleSelect(link: TreeLink) {
    if (link.botError) {
      setBrokenSkillInfo(link);
    }
    const { skillId, dialogId, trigger } = link;

    updateZoomRate({ currentRate: 1 });

    if (trigger != null) {
      selectTo(skillId ?? null, dialogId ?? null, `triggers[${trigger}]`);
    } else if (dialogId != null) {
      navTo(skillId ?? projectId, dialogId);
    } else {
      // with no dialog or ID, we must be looking at a bot link
      navTo(skillId ?? projectId, null);
    }
  }

  const onCreateDialogComplete = (projectId: string) => (dialogId: string) => {
    const target = projectId;
    if (dialogId) {
      navTo(target, dialogId);
    }
  };

  const projectTreeHeaderMenuItems = [
    {
      key: 'CreateNewSkill',
      label: formatMessage('Create a new skill'),
      onClick: () => {
        setCreationFlowType('Skill');
        setCreationFlowStatus(CreationFlowStatus.NEW);
        TelemetryClient.track('AddNewSkillStarted', { method: 'newSkill' });
      },
    },
    {
      key: 'OpenSkill',
      label: formatMessage('Open an existing skill'),
      onClick: () => {
        setCreationFlowType('Skill');
        setCreationFlowStatus(CreationFlowStatus.OPEN);
        TelemetryClient.track('AddNewSkillStarted', { method: 'existingSkill' });
      },
    },
    {
      key: 'ConnectRemoteSkill',
      label: formatMessage('Connect a remote skill'),
      onClick: () => {
        setAddSkillDialogModalVisibility(true);
        TelemetryClient.track('AddNewSkillStarted', { method: 'remoteSkill' });
      },
    },
  ];

  async function handleDeleteDialog(projectId: string, dialogId: string) {
    const refs = getAllRef(dialogId, dialogs);
    let setting: Record<string, string | ((subTitle: string, style: any) => JSX.Element)> = {
      confirmBtnText: formatMessage('Yes'),
      cancelBtnText: formatMessage('Cancel'),
    };
    let title = '';
    let subTitle = '';
    if (refs.length > 0) {
      title = DialogDeleting.TITLE;
      subTitle = `${refs.reduce((result, item) => `${result} ${item} \n`, '')}`;
      setting = {
        onRenderContent,
        style: dialogStyle.console,
      };
    } else {
      title = DialogDeleting.NO_LINKED_TITLE;
    }
    const result = await OpenConfirmModal(title, subTitle, setting);

    if (result) {
      await removeDialog(dialogId, projectId);
      commitChanges();
    }
  }

  async function handleDeleteTrigger(projectId: string, dialogId: string, index: number) {
    const content = DialogdeleteTrigger(
      projectDialogsMap[projectId],
      dialogId,
      index,
      async (trigger) => await deleteTrigger(projectId, dialogId, trigger)
    );

    if (content) {
      await updateDialog({ id: dialogId, content, projectId });
      const match = /\[(\d+)\]/g.exec(selected);
      const current = match?.[1];
      if (!current) {
        commitChanges();
        return;
      }
      const currentIdx = parseInt(current);
      if (index === currentIdx) {
        if (currentIdx - 1 >= 0) {
          //if the deleted node is selected and the selected one is not the first one, navTo the previous trigger;
          await selectTo(projectId, dialogId, createSelectedPath(currentIdx - 1));
        } else {
          //if the deleted node is selected and the selected one is the first one, navTo the first trigger;
          await navTo(projectId, dialogId);
        }
      } else if (index < currentIdx) {
        //if the deleted node is at the front, navTo the current one;
        await selectTo(projectId, dialogId, createSelectedPath(currentIdx - 1));
      }

      commitChanges();
    }
  }

  const handleCreateDialog = (projectId: string) => {
    createDialogBegin([], onCreateDialogComplete(projectId), projectId);
    setDialogModalInfo(projectId);
  };

  const handleDisplayManifestModal = (currentProjectId: string) => {
    setExportSkillModalInfo(currentProjectId);
  };

  const handleErrorClick = (projectId: string, skillId: string, diagnostic: Diagnostic) => {
    switch (diagnostic.source) {
      case 'appsettings.json': {
        navigateTo(createBotSettingUrl(projectId, skillId, diagnostic.path));
        break;
      }
      case 'manifest.json': {
        setExportSkillModalInfo(skillId || projectId);
      }
    }
  };

  const selectedTrigger = currentDialog?.triggers.find((t) => t.id === selected);

  return (
    <React.Fragment>
      <ProjectTree
        headerMenu={projectTreeHeaderMenuItems}
        selectedLink={{
          projectId: rootProjectId,
          skillId: rootProjectId === projectId ? undefined : projectId,
          dialogId,
          trigger: parseTriggerId(selectedTrigger?.id),
        }}
        onBotCreateDialog={handleCreateDialog}
        onBotDeleteDialog={handleDeleteDialog}
        onBotEditManifest={handleDisplayManifestModal}
        onBotExportZip={exportToZip}
        onBotRemoveSkill={removeSkillFromBotProject}
        onBotStart={startSingleBot}
        onBotStop={stopSingleBot}
        onDialogCreateTrigger={(projectId, dialogId) => {
          setTriggerModalInfo({ projectId, dialogId });
        }}
        onDialogDeleteTrigger={handleDeleteTrigger}
        onErrorClick={handleErrorClick}
        onSelect={handleSelect}
      />
    </React.Fragment>
  );
};

export default SideBar;
