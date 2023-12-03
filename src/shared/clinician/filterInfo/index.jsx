import { Container } from "./styled";

const formatDate = (dateString) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
};

const FilterInfo = ({ formData }) => {
  const { clientId, surveyType, surveyStatus, fromDate, toDate } = formData;

  return (
    <Container>
      <span className="header">Filters applied </span>

      {clientId && (
        <p>
          <span className="form-value-name">Client Id: </span> {clientId}
        </p>
      )}
      {surveyType &&
        Object.entries(surveyType).filter(([, isSelected]) => isSelected)
          .length > 0 && (
          <p>
            <span className="form-value-name">Survey Type: </span>
            {Object.entries(surveyType)
              .filter(([, isSelected]) => isSelected)
              .map(([type]) => type)
              .join(", ")}
          </p>
        )}
      {surveyStatus &&
        Object.entries(surveyStatus).filter(([, isSelected]) => isSelected)
          .length > 0 && (
          <p>
            <span className="form-value-name">Survey Status: </span>
            {Object.entries(surveyStatus)
              .filter(([, isSelected]) => isSelected)
              .map(([status]) => status)
              .join(", ")}
          </p>
        )}
      {fromDate && (
        <p>
          <span className="form-value-name">From: </span>
          {formatDate(fromDate)}
        </p>
      )}
      {toDate && (
        <p>
          <span className="form-value-name">To: </span>
          {formatDate(toDate)}
        </p>
      )}
    </Container>
  );
};

export default FilterInfo;
