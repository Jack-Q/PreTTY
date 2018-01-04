import * as React from 'react';
import { IApplicationService, subscriber } from '../model/service';

export const connectToService =
  <E, T extends IApplicationService<E>, ByPassProps = {}, Props = {}>
    (service: T, mapper: (e: E, t: T) => Props) =>
    (Component: React.ComponentType<Props | ByPassProps>) => {
      class ConnectToService extends React.Component<ByPassProps, { props: Props }> {
        constructor(props: ByPassProps, state: any) {
          super(props, state);
          this.state = { props: mapper(service.getState(), service) };
        }

        public componentWillMount() {
          service.subscribeStateUpdate(this.subs);
        }

        public componentWillUnmount() {
          service.unsubscribeStateUpdate(this.subs);
        }

        public render() {
          return <Component {...this.props} {...this.state.props} />;
        }

        private subs: subscriber<E> = (e: E) => this.setState({ props: mapper(e, service) });
      }
      return ConnectToService;
    };

/**
 * helper function to create binding with correct type declaration
 * @param service that implements IApplicationService
 */
export const getServiceConnector =
  <IStateEvent, Service extends IApplicationService<IStateEvent>>(service: Service) =>
    <Props, ByPassProps>(
      mapper: (state: IStateEvent, svc: Service) => Props,
      Component: React.ComponentType<Props | ByPassProps>,
    ) =>
      connectToService<IStateEvent, Service, ByPassProps, Props>(service, mapper)(Component);
