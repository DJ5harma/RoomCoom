import { PLUGIN } from "./plugin.modal";

class PluginServiceImpl {
	getAll = async () => await PLUGIN.find();
}

export const PluginService = new PluginServiceImpl();
