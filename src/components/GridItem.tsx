import React from "react";

export interface GridItemProps {
  title: string;
  customer: string;
  src: string;
  allowFullScreen: boolean;
  width: string;
  height: string;
}

export function GridItem(props: GridItemProps) {
  return (
    <div>
      <iframe
        title={props.title}
        src={props.src}
        allowFullScreen={props.allowFullScreen}
        width={props.width}
        height={props.height}
      ></iframe>
    </div>
  );
}
