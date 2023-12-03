const YoutubeEmbed = ({ wideMode }) => {
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

export default YoutubeEmbed;
