import React from "react";
import Welcome from "../Welcome";

export function preview() {
  return <Welcome includeUnsubscribe />;
}
export function previewNoUnsubscribe() {
  return <Welcome />;
}
