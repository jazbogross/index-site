import { useMediaAsset } from "@staticcms/core";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import React from "react";

const PostPreview = ({ entry, widgetFor, collection, field }) => {
  const image = useMediaAsset(entry.data.image, collection, field, entry);
  
  return (
    <div className="mw6 center ph3 pv4">
      <h1 className="f2 lh-title b mb3">{entry.data.title}</h1>
      <h1 className="f2 lh-title b mb3">{entry.data.youtubelink}</h1>
      <div className="flex justify-between grey-3">
        <p>{format(parseISO(entry.data.date), "iii, MMM d, yyyy")}</p>
      </div>
      <div className="cms mw6">
        <p>{entry.data.description}</p>
        {image && <img src={image} alt={entry.data.title} />}
        <iframe
            width="560"
            height="315"
            src={entry.data.youtubelink}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={entry.data.title}
          ></iframe>
        {widgetFor("body")}
      </div>
    </div>
  );
};

export default PostPreview;
