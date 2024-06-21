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
      <div>{props.title}</div>
      <iframe
        title={props.title}
        src={props.src}
        width='750'
        height='500'
        allowFullScreen='true'
      ></iframe>
    </div>
  );
}
