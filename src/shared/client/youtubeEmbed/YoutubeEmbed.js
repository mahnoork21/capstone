import { Button } from "@mui/material";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ wideMode }) => {
  const videoWidth = "500px";

  return (
    <div>
      <iframe
        className={`youtube-video ${wideMode ? "wide" : ""}`}
        height="300"
        src={`https://www.youtube.com/embed/7C8MMd7iiEU`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Pufi2"
      />
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  containerWidth: PropTypes.number.isRequired,
};

export default YoutubeEmbed;
