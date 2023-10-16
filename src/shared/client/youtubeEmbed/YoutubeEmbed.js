import { Button } from "@mui/material";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId, wideMode, onClick }) => {
  // Calculate the width for the embedded YouTube video
  // const videoWidth = (containerWidth * 0.7) / 2;
  const videoWidth = "500px";

  return (
    <div>
      <iframe
        className={`youtube-video ${wideMode ? "wide" : ""}`}
        // width={videoWidth}
        height="300"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>

    // <div style={{ position: "relative", width: videoWidth, height: "300px" }}>
    //   <div
    //     onClick={onClick}
    //     style={{
    //       position: "absolute",
    //       top: 0,
    //       left: 0,
    //       width: "100%",
    //       height: "100%",
    //       zIndex: 1,
    //     }}
    //   >
    //     <Button onClick={onClick}>HELLo</Button>
    //   </div>
    //   <iframe
    //     className={`youtube-video ${wideMode ? "wide" : ""}`}
    //     width="100%"
    //     height="100%"
    //     src={`https://www.youtube.com/embed/${embedId}`}
    //     frameBorder="0"
    //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //     allowFullScreen
    //     title="Embedded youtube"
    //     style={{ position: "relative", zIndex: 0 }}
    //   />
    // </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  containerWidth: PropTypes.number.isRequired,
};

export default YoutubeEmbed;
