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
