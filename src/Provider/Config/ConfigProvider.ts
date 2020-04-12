import Config from "#/Model/Config";

/** listener called when configurations get updated */
export type OnConfigDirtyListener = (config: Config) => any;

export default interface ConfigProvider {
    /**
     * provides the saved configuration
     */
    provide(): Config;

    /**
     * set a listener called when some of configurations get updated
     * @param listener listener to attach
     */
    setOnConfigDirtyListener(listener: OnConfigDirtyListener): any;
}
