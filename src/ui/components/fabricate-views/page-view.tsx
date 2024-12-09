import React from "react";
import EmptyTemplate from "../../templates/empty-template";

interface PageViewProps {
  onDragOverEvent: (e: React.DragEvent) => void;
  onDragLeaveEvent: (e: React.DragEvent) => void;
  onDropEvent: (e: React.DragEvent) => void;
  [x: string]: unknown;
}

export default function PageView(props: PageViewProps) {
  const { onDragOverEvent, onDragLeaveEvent, onDropEvent, ...other } = props;

  return (
    <EmptyTemplate
      onDragOverEvent={onDragOverEvent}
      onDragLeaveEvent={onDragLeaveEvent}
      onDropEvent={onDropEvent}
      {...other}
    />
  );
}
