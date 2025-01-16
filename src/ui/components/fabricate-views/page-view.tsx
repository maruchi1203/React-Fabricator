import React from "react";
import EmptyTemplate from "../../templates/empty-template";
import GlobalOptionDTO from "./info/global-option-dto";

interface PageViewProps {
  globalOption: GlobalOptionDTO;
  onDragOverEvent: (e: React.DragEvent) => void;
  onDragLeaveEvent: (e: React.DragEvent) => void;
  onDropEvent: (e: React.DragEvent) => void;
  [x: string]: unknown;
}

export default function PageView(props: PageViewProps) {
  const {
    globalOption,
    onDragOverEvent,
    onDragLeaveEvent,
    onDropEvent,
    ...other
  } = props;

  return (
    <EmptyTemplate
      globalOption={globalOption}
      onDragOverEvent={onDragOverEvent}
      onDragLeaveEvent={onDragLeaveEvent}
      onDropEvent={onDropEvent}
      {...other}
    />
  );
}
