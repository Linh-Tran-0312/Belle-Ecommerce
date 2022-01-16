import { Container } from "typedi";
import { Controller } from "tsoa";
interface IocContainer {
    get<T>(controller: { prototype: T }): T;
};

export const iocContainer: IocContainer = {
    get: <T>(controller: { prototype: T }): T => {
      return Container.get<T>(controller as never);
    },
  };