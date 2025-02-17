import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert, AlertActionCloseButton, AlertGroup } from "@patternfly/react-core";
import "./Notifications.css";
import { alertDelete } from "../../core/actions/alerts";

const messages = defineMessages({
  errorSubscription: {
    defaultMessage: "This system does not have any valid subscriptions.",
  },
});

class Notifications extends React.PureComponent {
  constructor() {
    super();
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <AlertGroup isToast>
        {this.props.alerts.map((alert) => {
          switch (alert.type) {
            case "composeQueued": {
              return (
                <Alert
                  id="alertComposeQueued"
                  key={alert.id}
                  variant="info"
                  title={
                    <FormattedMessage
                      defaultMessage="{blueprint} Image creation has been added to the {queue}."
                      values={{
                        blueprint: <strong>{alert.blueprintName}:</strong>,
                        queue: <a href={`#blueprint/${alert.blueprintName}/images`}>queue</a>,
                      }}
                    />
                  }
                  actionClose={<AlertActionCloseButton onClose={() => this.props.alertDelete(alert.id)} />}
                />
              );
            }
            case "composeStarted": {
              return (
                <Alert
                  id="alertComposeStarted"
                  key={alert.id}
                  variant="info"
                  title={
                    <FormattedMessage
                      defaultMessage="{blueprint} Image creation has {queue}."
                      values={{
                        blueprint: <strong>{alert.blueprintName}:</strong>,
                        queue: <a href={`#blueprint/${alert.blueprintName}/images`}>started</a>,
                      }}
                    />
                  }
                  actionClose={<AlertActionCloseButton onClose={() => this.props.alertDelete(alert.id)} />}
                />
              );
            }
            case "composeSucceeded": {
              return (
                <Alert
                  id="alertComposeSucceeded"
                  key={alert.id}
                  variant="success"
                  title={
                    <FormattedMessage
                      defaultMessage="{blueprint} Image creation is {queue}."
                      values={{
                        blueprint: <strong>{alert.blueprintName}:</strong>,
                        queue: <a href={`#blueprint/${alert.blueprintName}/images`}>complete</a>,
                      }}
                    />
                  }
                  actionClose={<AlertActionCloseButton onClose={() => this.props.alertDelete(alert.id)} />}
                />
              );
            }
            case "composeFailed": {
              return (
                <Alert
                  id="alertComposeFailed"
                  key={alert.id}
                  variant="danger"
                  title={
                    <FormattedMessage
                      defaultMessage="{blueprint} Image creation failed."
                      values={{
                        blueprint: <strong>{alert.blueprintName}:</strong>,
                      }}
                    />
                  }
                  actionClose={<AlertActionCloseButton onClose={() => this.props.alertDelete(alert.id)} />}
                >
                  {alert.error ===
                    "This system does not have any valid subscriptions. Subscribe it before specifying rhsm: true in sources." &&
                    formatMessage(messages.errorSubscription)}
                </Alert>
              );
            }
            case "blueprintCommitStarted": {
              return (
                <Alert
                  id="alertBlueprintCommitStarted"
                  key={alert.id}
                  variant="info"
                  title={
                    <FormattedMessage
                      defaultMessage="{blueprint} Committing blueprint."
                      values={{
                        blueprint: <strong>{alert.blueprintName}:</strong>,
                      }}
                    />
                  }
                  actionClose={<AlertActionCloseButton onClose={() => this.props.alertDelete(alert.id)} />}
                />
              );
            }
            case "blueprintCommitSucceeded": {
              return (
                <Alert
                  id="alertBlueprintCommitSucceeded"
                  key={alert.id}
                  variant="success"
                  title={
                    <FormattedMessage
                      defaultMessage="{blueprint} Blueprint changes are committed."
                      values={{
                        blueprint: <strong>{alert.blueprintName}:</strong>,
                      }}
                    />
                  }
                  actionClose={<AlertActionCloseButton onClose={() => this.props.alertDelete(alert.id)} />}
                />
              );
            }
            case "blueprintCommitFailed": {
              return (
                <Alert
                  id="alertBlueprintCommitFailed"
                  key={alert.id}
                  variant="danger"
                  title={
                    <FormattedMessage
                      defaultMessage="{blueprint} Commit failed."
                      values={{
                        blueprint: <strong>{alert.blueprintName}:</strong>,
                      }}
                    />
                  }
                  actionClose={<AlertActionCloseButton onClose={() => this.props.alertDelete(alert.id)} />}
                />
              );
            }
            default:
              break;
          }
        })}
      </AlertGroup>
    );
  }
}

Notifications.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.object),
  alertDelete: PropTypes.func,
  intl: intlShape.isRequired,
};

Notifications.defaultProps = {
  alerts: [],
  alertDelete() {},
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

const mapDispatchToProps = (dispatch) => ({
  alertDelete: (id) => {
    dispatch(alertDelete(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Notifications));
