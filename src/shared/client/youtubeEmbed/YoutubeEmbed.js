import PropTypes from "prop-types";
import { useEffect } from "react";

const YoutubeEmbed = ({ embedId }) => {
  // Calculate the width for the embedded YouTube video
  // const videoWidth = (containerWidth * 0.7) / 2;
  const videoWidth = "500px";

  return (
    <div>
      <iframe
        className="youtube-video"
        // width={videoWidth}
        height="300"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  containerWidth: PropTypes.number.isRequired,
};

export default YoutubeEmbed;
