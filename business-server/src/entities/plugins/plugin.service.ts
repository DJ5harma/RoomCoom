import { AppError } from "../../error/AppError";
import type { InstanceType, uuid } from "../../types";
import { PLUGIN } from "./plugin.modal";

class PluginServiceImpl {
	getAll = async () => await PLUGIN.find();
	doesSupportInstanceTypeById = async (
		pluginId: uuid,
		instanceType: InstanceType,
	) => {
		const plugin = await PLUGIN.findById(pluginId);
		if (!plugin) throw new AppError(404, "Plugin not found");
		if (!plugin.supportedInstanceTypes.includes(instanceType)) return false;
		return true;
	};
}

export const PluginService = new PluginServiceImpl();
