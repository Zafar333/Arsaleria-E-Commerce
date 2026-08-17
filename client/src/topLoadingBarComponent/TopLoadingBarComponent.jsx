"use client";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickle: true,
  minimum: 0.1,
  trickleSpeed: 150,
});

export const startLoadingBar = () => {
  NProgress.start();
};

export const stopLoadingBar = () => {
  NProgress.done();
};
