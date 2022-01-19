import { Container } from "typedi";

interface IocContainer {
    get<T>(controller: { prototype: T }): T;
};

// Create container for DI
export const iocContainer: IocContainer = {
    get: <T>(controller: { prototype: T }): T => {
      return Container.get<T>(controller as never);
    },
  };