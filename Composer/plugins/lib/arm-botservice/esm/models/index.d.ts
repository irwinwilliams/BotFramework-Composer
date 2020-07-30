import { BaseResource, CloudError, AzureServiceClientOptions } from "@azure/ms-rest-azure-js";
import * as msRest from "@azure/ms-rest-js";
export { BaseResource, CloudError };
/**
 * The SKU of the cognitive services account.
 */
export interface Sku {
    /**
     * The sku name. Possible values include: 'F0', 'S1'
     */
    name: SkuName;
    /**
     * Gets the sku tier. This is based on the SKU name. Possible values include: 'Free', 'Standard'
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly tier?: SkuTier;
}
/**
 * Azure resource
 */
export interface Resource extends BaseResource {
    /**
     * Specifies the resource ID.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly id?: string;
    /**
     * Specifies the name of the resource.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly name?: string;
    /**
     * Specifies the location of the resource.
     */
    location?: string;
    /**
     * Specifies the type of the resource.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly type?: string;
    /**
     * Contains resource tags defined as key/value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * Gets or sets the SKU of the resource.
     */
    sku?: Sku;
    /**
     * Required. Gets or sets the Kind of the resource. Possible values include: 'sdk', 'designer',
     * 'bot', 'function'
     */
    kind?: Kind;
    /**
     * Entity Tag
     */
    etag?: string;
}
/**
 * The parameters to provide for the Bot.
 */
export interface BotProperties {
    /**
     * The Name of the bot
     */
    displayName: string;
    /**
     * The description of the bot
     */
    description?: string;
    /**
     * The Icon Url of the bot
     */
    iconUrl?: string;
    /**
     * The bot's endpoint
     */
    endpoint: string;
    /**
     * The bot's endpoint version
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly endpointVersion?: string;
    /**
     * Microsoft App Id for the bot
     */
    msaAppId: string;
    /**
     * Collection of channels for which the bot is configured
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly configuredChannels?: string[];
    /**
     * Collection of channels for which the bot is enabled
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly enabledChannels?: string[];
    /**
     * The Application Insights key
     */
    developerAppInsightKey?: string;
    /**
     * The Application Insights Api Key
     */
    developerAppInsightsApiKey?: string;
    /**
     * The Application Insights App Id
     */
    developerAppInsightsApplicationId?: string;
    /**
     * Collection of LUIS App Ids
     */
    luisAppIds?: string[];
    /**
     * The LUIS Key
     */
    luisKey?: string;
}
/**
 * Bot resource definition
 */
export interface Bot extends Resource {
    /**
     * The set of properties specific to bot resource
     */
    properties?: BotProperties;
}
/**
 * Contains the possible cases for Channel.
 */
export declare type ChannelUnion = Channel | FacebookChannel | EmailChannel | MsTeamsChannel | SkypeChannel | KikChannel | WebChatChannel | DirectLineChannel | TelegramChannel | SmsChannel | SlackChannel;
/**
 * Channel definition
 */
export interface Channel {
    /**
     * Polymorphic Discriminator
     */
    channelName: "Channel";
}
/**
 * Bot channel resource definition
 */
export interface BotChannel extends Resource {
    /**
     * The set of properties specific to bot channel resource
     */
    properties?: ChannelUnion;
}
/**
 * A Facebook page for Facebook channel registration
 */
export interface FacebookPage {
    /**
     * Page id
     */
    id: string;
    /**
     * Facebook application access token. Value only returned through POST to the action Channel List
     * API, otherwise empty.
     */
    accessToken: string;
}
/**
 * The parameters to provide for the Facebook channel.
 */
export interface FacebookChannelProperties {
    /**
     * Verify token. Value only returned through POST to the action Channel List API, otherwise
     * empty.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly verifyToken?: string;
    /**
     * The list of Facebook pages
     */
    pages?: FacebookPage[];
    /**
     * Facebook application id
     */
    appId: string;
    /**
     * Facebook application secret. Value only returned through POST to the action Channel List API,
     * otherwise empty.
     */
    appSecret: string;
    /**
     * Callback Url
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly callbackUrl?: string;
    /**
     * Whether this channel is enabled for the bot
     */
    isEnabled: boolean;
}
/**
 * Facebook channel definition
 */
export interface FacebookChannel {
    /**
     * Polymorphic Discriminator
     */
    channelName: "FacebookChannel";
    /**
     * The set of properties specific to bot facebook channel
     */
    properties?: FacebookChannelProperties;
}
/**
 * The parameters to provide for the Email channel.
 */
export interface EmailChannelProperties {
    /**
     * The email address
     */
    emailAddress: string;
    /**
     * The password for the email address. Value only returned through POST to the action Channel
     * List API, otherwise empty.
     */
    password: string;
    /**
     * Whether this channel is enabled for the bot
     */
    isEnabled: boolean;
}
/**
 * Email channel definition
 */
export interface EmailChannel {
    /**
     * Polymorphic Discriminator
     */
    channelName: "EmailChannel";
    /**
     * The set of properties specific to email channel resource
     */
    properties?: EmailChannelProperties;
}
/**
 * The parameters to provide for the Microsoft Teams channel.
 */
export interface MsTeamsChannelProperties {
    /**
     * Enable calling for Microsoft Teams channel
     */
    enableCalling?: boolean;
    /**
     * Webhook for Microsoft Teams channel calls
     */
    callingWebHook?: string;
    /**
     * Whether this channel is enabled for the bot
     */
    isEnabled: boolean;
}
/**
 * Microsoft Teams channel definition
 */
export interface MsTeamsChannel {
    /**
     * Polymorphic Discriminator
     */
    channelName: "MsTeamsChannel";
    /**
     * The set of properties specific to Microsoft Teams channel resource
     */
    properties?: MsTeamsChannelProperties;
}
/**
 * The parameters to provide for the Microsoft Teams channel.
 */
export interface SkypeChannelProperties {
    /**
     * Enable messaging for Skype channel
     */
    enableMessaging?: boolean;
    /**
     * Enable media cards for Skype channel
     */
    enableMediaCards?: boolean;
    /**
     * Enable video for Skype channel
     */
    enableVideo?: boolean;
    /**
     * Enable calling for Skype channel
     */
    enableCalling?: boolean;
    /**
     * Enable screen sharing for Skype channel
     */
    enableScreenSharing?: boolean;
    /**
     * Enable groups for Skype channel
     */
    enableGroups?: boolean;
    /**
     * Group mode for Skype channel
     */
    groupsMode?: string;
    /**
     * Calling web hook for Skype channel
     */
    callingWebHook?: string;
    /**
     * Whether this channel is enabled for the bot
     */
    isEnabled: boolean;
}
/**
 * Skype channel definition
 */
export interface SkypeChannel {
    /**
     * Polymorphic Discriminator
     */
    channelName: "SkypeChannel";
    /**
     * The set of properties specific to Skype channel resource
     */
    properties?: SkypeChannelProperties;
}
/**
 * The parameters to provide for the Kik channel.
 */
export interface KikChannelProperties {
    /**
     * The Kik user name
     */
    userName: string;
    /**
     * Kik API key. Value only returned through POST to the action Channel List API, otherwise empty.
     */
    apiKey: string;
    /**
     * Whether this channel is validated for the bot
     */
    isValidated?: boolean;
    /**
     * Whether this channel is enabled for the bot
     */
    isEnabled: boolean;
}
/**
 * Kik channel definition
 */
export interface KikChannel {
    /**
     * Polymorphic Discriminator
     */
    channelName: "KikChannel";
    /**
     * The set of properties specific to Kik channel resource
     */
    properties?: KikChannelProperties;
}
/**
 * A site for the Webchat channel
 */
export interface WebChatSite {
    /**
     * Site Id
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly siteId?: string;
    /**
     * Site name
     */
    siteName: string;
    /**
     * Primary key. Value only returned through POST to the action Channel List API, otherwise empty.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly key?: string;
    /**
     * Secondary key. Value only returned through POST to the action Channel List API, otherwise
     * empty.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly key2?: string;
    /**
     * Whether this site is enabled for DirectLine channel
     */
    isEnabled: boolean;
    /**
     * Whether this site is enabled for preview versions of Webchat
     */
    enablePreview: boolean;
}
/**
 * The parameters to provide for the Web Chat channel.
 */
export interface WebChatChannelProperties {
    /**
     * Web chat control embed code
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly webChatEmbedCode?: string;
    /**
     * The list of Web Chat sites
     */
    sites?: WebChatSite[];
}
/**
 * Web Chat channel definition
 */
export interface WebChatChannel {
    /**
     * Polymorphic Discriminator
     */
    channelName: "WebChatChannel";
    /**
     * The set of properties specific to Web Chat channel resource
     */
    properties?: WebChatChannelProperties;
}
/**
 * A site for the Direct Line channel
 */
export interface DirectLineSite {
    /**
     * Site Id
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly siteId?: string;
    /**
     * Site name
     */
    siteName: string;
    /**
     * Primary key. Value only returned through POST to the action Channel List API, otherwise empty.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly key?: string;
    /**
     * Secondary key. Value only returned through POST to the action Channel List API, otherwise
     * empty.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly key2?: string;
    /**
     * Whether this site is enabled for DirectLine channel.
     */
    isEnabled: boolean;
    /**
     * Whether this site is enabled for Bot Framework V1 protocol.
     */
    isV1Enabled: boolean;
    /**
     * Whether this site is enabled for Bot Framework V1 protocol.
     */
    isV3Enabled: boolean;
    /**
     * Whether this site is enabled for authentication with Bot Framework.
     */
    isSecureSiteEnabled?: boolean;
    /**
     * List of Trusted Origin URLs for this site. This field is applicable only if
     * isSecureSiteEnabled is True.
     */
    trustedOrigins?: string[];
}
/**
 * The parameters to provide for the Direct Line channel.
 */
export interface DirectLineChannelProperties {
    /**
     * The list of Direct Line sites
     */
    sites?: DirectLineSite[];
}
/**
 * Direct Line channel definition
 */
export interface DirectLineChannel {
    /**
     * Polymorphic Discriminator
     */
    channelName: "DirectLineChannel";
    /**
     * The set of properties specific to Direct Line channel resource
     */
    properties?: DirectLineChannelProperties;
}
/**
 * The parameters to provide for the Telegram channel.
 */
export interface TelegramChannelProperties {
    /**
     * The Telegram access token. Value only returned through POST to the action Channel List API,
     * otherwise empty.
     */
    accessToken: string;
    /**
     * Whether this channel is validated for the bot
     */
    isValidated?: boolean;
    /**
     * Whether this channel is enabled for the bot
     */
    isEnabled: boolean;
}
/**
 * Telegram channel definition
 */
export interface TelegramChannel {
    /**
     * Polymorphic Discriminator
     */
    channelName: "TelegramChannel";
    /**
     * The set of properties specific to Telegram channel resource
     */
    properties?: TelegramChannelProperties;
}
/**
 * The parameters to provide for the Sms channel.
 */
export interface SmsChannelProperties {
    /**
     * The Sms phone
     */
    phone: string;
    /**
     * The Sms account SID. Value only returned through POST to the action Channel List API,
     * otherwise empty.
     */
    accountSID: string;
    /**
     * The Sms auth token. Value only returned through POST to the action Channel List API, otherwise
     * empty.
     */
    authToken: string;
    /**
     * Whether this channel is validated for the bot
     */
    isValidated?: boolean;
    /**
     * Whether this channel is enabled for the bot
     */
    isEnabled: boolean;
}
/**
 * Sms channel definition
 */
export interface SmsChannel {
    /**
     * Polymorphic Discriminator
     */
    channelName: "SmsChannel";
    /**
     * The set of properties specific to Sms channel resource
     */
    properties?: SmsChannelProperties;
}
/**
 * The parameters to provide for the Slack channel.
 */
export interface SlackChannelProperties {
    /**
     * The Slack client id
     */
    clientId: string;
    /**
     * The Slack client secret. Value only returned through POST to the action Channel List API,
     * otherwise empty.
     */
    clientSecret: string;
    /**
     * The Slack verification token. Value only returned through POST to the action Channel List API,
     * otherwise empty.
     */
    verificationToken: string;
    /**
     * The Slack landing page Url
     */
    landingPageUrl?: string;
    /**
     * The Slack redirect action
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly redirectAction?: string;
    /**
     * The Sms auth token
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly lastSubmissionId?: string;
    /**
     * Whether to register the settings before OAuth validation is performed. Recommended to True.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly registerBeforeOAuthFlow?: boolean;
    /**
     * Whether this channel is validated for the bot
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly isValidated?: boolean;
    /**
     * Whether this channel is enabled for the bot
     */
    isEnabled: boolean;
}
/**
 * Slack channel definition
 */
export interface SlackChannel {
    /**
     * Polymorphic Discriminator
     */
    channelName: "SlackChannel";
    /**
     * The set of properties specific to Slack channel resource
     */
    properties?: SlackChannelProperties;
}
/**
 * The display name of a connection Item Setting registered with the Bot
 */
export interface ConnectionItemName {
    /**
     * Connection Item name that has been added in the API
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly name?: string;
}
/**
 * Extra Parameter in a Connection Setting Properties to indicate service provider specific
 * properties
 */
export interface ConnectionSettingParameter {
    /**
     * Key for the Connection Setting Parameter.
     */
    key?: string;
    /**
     * Value associated with the Connection Setting Parameter.
     */
    value?: string;
}
/**
 * Properties for a Connection Setting Item
 */
export interface ConnectionSettingProperties {
    /**
     * Client Id associated with the Connection Setting.
     */
    clientId?: string;
    /**
     * Setting Id set by the service for the Connection Setting.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly settingId?: string;
    /**
     * Client Secret associated with the Connection Setting
     */
    clientSecret?: string;
    /**
     * Scopes associated with the Connection Setting
     */
    scopes?: string;
    /**
     * Service Provider Id associated with the Connection Setting
     */
    serviceProviderId?: string;
    /**
     * Service Provider Display Name associated with the Connection Setting
     */
    serviceProviderDisplayName?: string;
    /**
     * Service Provider Parameters associated with the Connection Setting
     */
    parameters?: ConnectionSettingParameter[];
}
/**
 * Bot channel resource definition
 */
export interface ConnectionSetting extends Resource {
    /**
     * The set of properties specific to bot channel resource
     */
    properties?: ConnectionSettingProperties;
}
/**
 * Extra Parameters specific to each Service Provider
 */
export interface ServiceProviderParameter {
    /**
     * Name of the Service Provider
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly name?: string;
    /**
     * Type of the Service Provider
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly type?: string;
    /**
     * Display Name of the Service Provider
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly displayName?: string;
    /**
     * Description of the Service Provider
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly description?: string;
    /**
     * Help Url for the  Service Provider
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly helpUrl?: string;
    /**
     * Default Name for the Service Provider
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly default?: string;
}
/**
 * The Object used to describe a Service Provider supported by Bot Service
 */
export interface ServiceProviderProperties {
    /**
     * Id for Service Provider
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly id?: string;
    /**
     * Display Name of the Service Provider
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly displayName?: string;
    /**
     * Display Name of the Service Provider
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly serviceProviderName?: string;
    /**
     * Display Name of the Service Provider
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly devPortalUrl?: string;
    /**
     * Display Name of the Service Provider
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly iconUrl?: string;
    /**
     * The list of parameters for the Service Provider
     */
    parameters?: ServiceProviderParameter[];
}
/**
 * Service Provider Definition
 */
export interface ServiceProvider {
    /**
     * The Properties of a Service Provider Object
     */
    properties?: ServiceProviderProperties;
}
/**
 * The list of bot service service providers response.
 */
export interface ServiceProviderResponseList {
    /**
     * The link used to get the next page of bot service service providers.
     */
    nextLink?: string;
    /**
     * Gets the list of bot service service providers and their properties.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly value?: ServiceProvider[];
}
/**
 * Bot Service error body.
 */
export interface ErrorBody {
    /**
     * error code
     */
    code: string;
    /**
     * error message
     */
    message: string;
}
/**
 * Bot Service error object.
 */
export interface ErrorModel {
    /**
     * The error body.
     */
    error?: ErrorBody;
}
/**
 * The operation supported by Bot Service Management.
 */
export interface OperationDisplayInfo {
    /**
     * The description of the operation.
     */
    description?: string;
    /**
     * The action that users can perform, based on their permission level.
     */
    operation?: string;
    /**
     * Service provider: Microsoft Bot Service.
     */
    provider?: string;
    /**
     * Resource on which the operation is performed.
     */
    resource?: string;
}
/**
 * The operations supported by Bot Service Management.
 */
export interface OperationEntity {
    /**
     * Operation name: {provider}/{resource}/{operation}.
     */
    name?: string;
    /**
     * The operation supported by Bot Service Management.
     */
    display?: OperationDisplayInfo;
    /**
     * The origin of the operation.
     */
    origin?: string;
    /**
     * Additional properties.
     */
    properties?: any;
}
/**
 * The request body for a request to Bot Service Management to check availability of a bot name.
 */
export interface CheckNameAvailabilityRequestBody {
    /**
     * the name of the bot for which availability needs to be checked.
     */
    name?: string;
    /**
     * the type of the bot for which availability needs to be checked
     */
    type?: string;
}
/**
 * The response body returned for a request to Bot Service Management to check availability of a
 * bot name.
 */
export interface CheckNameAvailabilityResponseBody {
    /**
     * indicates if the bot name is valid.
     */
    valid?: boolean;
    /**
     * additional message from the bot management api showing why a bot name is not available
     */
    message?: string;
}
/**
 * A request to Bot Service Management to check availability of an Enterprise Channel name.
 */
export interface EnterpriseChannelCheckNameAvailabilityRequest {
    /**
     * The name of the Enterprise Channel for which availability needs to be checked.
     */
    name?: string;
}
/**
 * A request to Bot Service Management to check availability of an Enterprise Channel name.
 */
export interface EnterpriseChannelCheckNameAvailabilityResponse {
    /**
     * Indicates if the Enterprise Channel name is valid.
     */
    valid?: boolean;
    /**
     * Additional information about why a bot name is not available.
     */
    message?: string;
}
/**
 * The properties specific to an Enterprise Channel Node.
 */
export interface EnterpriseChannelNode {
    /**
     * Id of Enterprise Channel Node. This is generated by the Bot Framework.
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly id?: string;
    /**
     * The current state of the Enterprise Channel Node. Possible values include: 'Creating',
     * 'CreateFailed', 'Started', 'Starting', 'StartFailed', 'Stopped', 'Stopping', 'StopFailed',
     * 'Deleting', 'DeleteFailed'
     */
    state?: EnterpriseChannelNodeState;
    /**
     * The name of the Enterprise Channel Node.
     */
    name: string;
    /**
     * The sku of the Enterprise Channel Node.
     */
    azureSku: string;
    /**
     * The location of the Enterprise Channel Node.
     */
    azureLocation: string;
}
/**
 * The parameters to provide for the Enterprise Channel.
 */
export interface EnterpriseChannelProperties {
    /**
     * The current state of the Enterprise Channel. Possible values include: 'Creating',
     * 'CreateFailed', 'Started', 'Starting', 'StartFailed', 'Stopped', 'Stopping', 'StopFailed',
     * 'Deleting', 'DeleteFailed'
     */
    state?: EnterpriseChannelState;
    /**
     * The nodes associated with the Enterprise Channel.
     */
    nodes: EnterpriseChannelNode[];
}
/**
 * Enterprise Channel resource definition
 */
export interface EnterpriseChannel extends Resource {
    /**
     * The set of properties specific to an Enterprise Channel resource.
     */
    properties?: EnterpriseChannelProperties;
}
/**
 * Optional Parameters.
 */
export interface BotsUpdateOptionalParams extends msRest.RequestOptionsBase {
    /**
     * Specifies the location of the resource.
     */
    location?: string;
    /**
     * Contains resource tags defined as key/value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * Gets or sets the SKU of the resource.
     */
    sku?: Sku;
    /**
     * Required. Gets or sets the Kind of the resource. Possible values include: 'sdk', 'designer',
     * 'bot', 'function'
     */
    kind?: Kind;
    /**
     * Entity Tag
     */
    etag?: string;
    /**
     * The set of properties specific to bot resource
     */
    properties?: BotProperties;
}
/**
 * Optional Parameters.
 */
export interface ChannelsUpdateOptionalParams extends msRest.RequestOptionsBase {
    /**
     * Specifies the location of the resource.
     */
    location?: string;
    /**
     * Contains resource tags defined as key/value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * Gets or sets the SKU of the resource.
     */
    sku?: Sku;
    /**
     * Required. Gets or sets the Kind of the resource. Possible values include: 'sdk', 'designer',
     * 'bot', 'function'
     */
    kind?: Kind;
    /**
     * Entity Tag
     */
    etag?: string;
    /**
     * The set of properties specific to bot channel resource
     */
    properties?: ChannelUnion;
}
/**
 * Optional Parameters.
 */
export interface EnterpriseChannelsUpdateOptionalParams extends msRest.RequestOptionsBase {
    /**
     * Specifies the location of the resource.
     */
    location?: string;
    /**
     * Contains resource tags defined as key/value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * Gets or sets the SKU of the resource.
     */
    sku?: Sku;
    /**
     * Required. Gets or sets the Kind of the resource. Possible values include: 'sdk', 'designer',
     * 'bot', 'function'
     */
    kind?: Kind;
    /**
     * Entity Tag
     */
    etag?: string;
    /**
     * The set of properties specific to an Enterprise Channel resource.
     */
    properties?: EnterpriseChannelProperties;
}
/**
 * Optional Parameters.
 */
export interface EnterpriseChannelsBeginUpdateOptionalParams extends msRest.RequestOptionsBase {
    /**
     * Specifies the location of the resource.
     */
    location?: string;
    /**
     * Contains resource tags defined as key/value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * Gets or sets the SKU of the resource.
     */
    sku?: Sku;
    /**
     * Required. Gets or sets the Kind of the resource. Possible values include: 'sdk', 'designer',
     * 'bot', 'function'
     */
    kind?: Kind;
    /**
     * Entity Tag
     */
    etag?: string;
    /**
     * The set of properties specific to an Enterprise Channel resource.
     */
    properties?: EnterpriseChannelProperties;
}
/**
 * An interface representing AzureBotServiceOptions.
 */
export interface AzureBotServiceOptions extends AzureServiceClientOptions {
    baseUri?: string;
}
/**
 * @interface
 * The list of  bot service operation response.
 * @extends Array<Bot>
 */
export interface BotResponseList extends Array<Bot> {
    /**
     * The link used to get the next page of bot service resources.
     */
    nextLink?: string;
}
/**
 * @interface
 * The list of bot service channel operation response.
 * @extends Array<BotChannel>
 */
export interface ChannelResponseList extends Array<BotChannel> {
    /**
     * The link used to get the next page of bot service channel resources.
     */
    nextLink?: string;
}
/**
 * @interface
 * The list of bot service operation response.
 * @extends Array<OperationEntity>
 */
export interface OperationEntityListResult extends Array<OperationEntity> {
    /**
     * The link used to get the next page of operations.
     */
    nextLink?: string;
}
/**
 * @interface
 * The list of bot service connection settings response.
 * @extends Array<ConnectionSetting>
 */
export interface ConnectionSettingResponseList extends Array<ConnectionSetting> {
    /**
     * The link used to get the next page of bot service connection setting resources.
     */
    nextLink?: string;
}
/**
 * @interface
 * The list of  bot service operation response.
 * @extends Array<EnterpriseChannel>
 */
export interface EnterpriseChannelResponseList extends Array<EnterpriseChannel> {
    /**
     * The link used to get the next page of bot service resources.
     */
    nextLink?: string;
}
/**
 * Defines values for SkuName.
 * Possible values include: 'F0', 'S1'
 * @readonly
 * @enum {string}
 */
export declare type SkuName = 'F0' | 'S1';
/**
 * Defines values for SkuTier.
 * Possible values include: 'Free', 'Standard'
 * @readonly
 * @enum {string}
 */
export declare type SkuTier = 'Free' | 'Standard';
/**
 * Defines values for Kind.
 * Possible values include: 'sdk', 'designer', 'bot', 'function'
 * @readonly
 * @enum {string}
 */
export declare type Kind = 'sdk' | 'designer' | 'bot' | 'function';
/**
 * Defines values for EnterpriseChannelState.
 * Possible values include: 'Creating', 'CreateFailed', 'Started', 'Starting', 'StartFailed',
 * 'Stopped', 'Stopping', 'StopFailed', 'Deleting', 'DeleteFailed'
 * @readonly
 * @enum {string}
 */
export declare type EnterpriseChannelState = 'Creating' | 'CreateFailed' | 'Started' | 'Starting' | 'StartFailed' | 'Stopped' | 'Stopping' | 'StopFailed' | 'Deleting' | 'DeleteFailed';
/**
 * Defines values for EnterpriseChannelNodeState.
 * Possible values include: 'Creating', 'CreateFailed', 'Started', 'Starting', 'StartFailed',
 * 'Stopped', 'Stopping', 'StopFailed', 'Deleting', 'DeleteFailed'
 * @readonly
 * @enum {string}
 */
export declare type EnterpriseChannelNodeState = 'Creating' | 'CreateFailed' | 'Started' | 'Starting' | 'StartFailed' | 'Stopped' | 'Stopping' | 'StopFailed' | 'Deleting' | 'DeleteFailed';
/**
 * Defines values for ChannelName.
 * Possible values include: 'FacebookChannel', 'EmailChannel', 'KikChannel', 'TelegramChannel',
 * 'SlackChannel', 'MsTeamsChannel', 'SkypeChannel', 'WebChatChannel', 'DirectLineChannel',
 * 'SmsChannel'
 * @readonly
 * @enum {string}
 */
export declare type ChannelName = 'FacebookChannel' | 'EmailChannel' | 'KikChannel' | 'TelegramChannel' | 'SlackChannel' | 'MsTeamsChannel' | 'SkypeChannel' | 'WebChatChannel' | 'DirectLineChannel' | 'SmsChannel';
/**
 * Contains response data for the create operation.
 */
export declare type BotsCreateResponse = Bot & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Bot;
    };
};
/**
 * Contains response data for the update operation.
 */
export declare type BotsUpdateResponse = Bot & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Bot;
    };
};
/**
 * Contains response data for the get operation.
 */
export declare type BotsGetResponse = Bot & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Bot;
    };
};
/**
 * Contains response data for the listByResourceGroup operation.
 */
export declare type BotsListByResourceGroupResponse = BotResponseList & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BotResponseList;
    };
};
/**
 * Contains response data for the list operation.
 */
export declare type BotsListResponse = BotResponseList & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BotResponseList;
    };
};
/**
 * Contains response data for the getCheckNameAvailability operation.
 */
export declare type BotsGetCheckNameAvailabilityResponse = CheckNameAvailabilityResponseBody & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CheckNameAvailabilityResponseBody;
    };
};
/**
 * Contains response data for the listByResourceGroupNext operation.
 */
export declare type BotsListByResourceGroupNextResponse = BotResponseList & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BotResponseList;
    };
};
/**
 * Contains response data for the listNext operation.
 */
export declare type BotsListNextResponse = BotResponseList & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BotResponseList;
    };
};
/**
 * Contains response data for the create operation.
 */
export declare type ChannelsCreateResponse = BotChannel & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BotChannel;
    };
};
/**
 * Contains response data for the update operation.
 */
export declare type ChannelsUpdateResponse = BotChannel & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BotChannel;
    };
};
/**
 * Contains response data for the get operation.
 */
export declare type ChannelsGetResponse = BotChannel & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BotChannel;
    };
};
/**
 * Contains response data for the listWithKeys operation.
 */
export declare type ChannelsListWithKeysResponse = BotChannel & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BotChannel;
    };
};
/**
 * Contains response data for the listByResourceGroup operation.
 */
export declare type ChannelsListByResourceGroupResponse = ChannelResponseList & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ChannelResponseList;
    };
};
/**
 * Contains response data for the listByResourceGroupNext operation.
 */
export declare type ChannelsListByResourceGroupNextResponse = ChannelResponseList & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ChannelResponseList;
    };
};
/**
 * Contains response data for the list operation.
 */
export declare type OperationsListResponse = OperationEntityListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: OperationEntityListResult;
    };
};
/**
 * Contains response data for the listNext operation.
 */
export declare type OperationsListNextResponse = OperationEntityListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: OperationEntityListResult;
    };
};
/**
 * Contains response data for the listServiceProviders operation.
 */
export declare type BotConnectionListServiceProvidersResponse = ServiceProviderResponseList & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ServiceProviderResponseList;
    };
};
/**
 * Contains response data for the listWithSecrets operation.
 */
export declare type BotConnectionListWithSecretsResponse = ConnectionSetting & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ConnectionSetting;
    };
};
/**
 * Contains response data for the create operation.
 */
export declare type BotConnectionCreateResponse = ConnectionSetting & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ConnectionSetting;
    };
};
/**
 * Contains response data for the update operation.
 */
export declare type BotConnectionUpdateResponse = ConnectionSetting & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ConnectionSetting;
    };
};
/**
 * Contains response data for the get operation.
 */
export declare type BotConnectionGetResponse = ConnectionSetting & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ConnectionSetting;
    };
};
/**
 * Contains response data for the listByBotService operation.
 */
export declare type BotConnectionListByBotServiceResponse = ConnectionSettingResponseList & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ConnectionSettingResponseList;
    };
};
/**
 * Contains response data for the listByBotServiceNext operation.
 */
export declare type BotConnectionListByBotServiceNextResponse = ConnectionSettingResponseList & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ConnectionSettingResponseList;
    };
};
/**
 * Contains response data for the checkNameAvailability operation.
 */
export declare type EnterpriseChannelsCheckNameAvailabilityResponse = EnterpriseChannelCheckNameAvailabilityResponse & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: EnterpriseChannelCheckNameAvailabilityResponse;
    };
};
/**
 * Contains response data for the listByResourceGroup operation.
 */
export declare type EnterpriseChannelsListByResourceGroupResponse = EnterpriseChannelResponseList & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: EnterpriseChannelResponseList;
    };
};
/**
 * Contains response data for the create operation.
 */
export declare type EnterpriseChannelsCreateResponse = EnterpriseChannel & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: EnterpriseChannel;
    };
};
/**
 * Contains response data for the update operation.
 */
export declare type EnterpriseChannelsUpdateResponse = EnterpriseChannel & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: EnterpriseChannel;
    };
};
/**
 * Contains response data for the get operation.
 */
export declare type EnterpriseChannelsGetResponse = EnterpriseChannel & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: EnterpriseChannel;
    };
};
/**
 * Contains response data for the beginCreate operation.
 */
export declare type EnterpriseChannelsBeginCreateResponse = EnterpriseChannel & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: EnterpriseChannel;
    };
};
/**
 * Contains response data for the beginUpdate operation.
 */
export declare type EnterpriseChannelsBeginUpdateResponse = EnterpriseChannel & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: EnterpriseChannel;
    };
};
/**
 * Contains response data for the listByResourceGroupNext operation.
 */
export declare type EnterpriseChannelsListByResourceGroupNextResponse = EnterpriseChannelResponseList & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: EnterpriseChannelResponseList;
    };
};
//# sourceMappingURL=index.d.ts.map