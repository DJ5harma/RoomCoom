import { ContainerTypeEnum, uuid } from "../types";

export type ContainerType = {
    id: uuid;
    name: string;
    type: ContainerTypeEnum;
}