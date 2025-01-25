"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePopupState = usePopupState;
Object.defineProperty(exports, "anchorRef", {
  enumerable: true,
  get: function () {
    return _core.anchorRef;
  }
});
Object.defineProperty(exports, "bindTrigger", {
  enumerable: true,
  get: function () {
    return _core.bindTrigger;
  }
});
Object.defineProperty(exports, "bindContextMenu", {
  enumerable: true,
  get: function () {
    return _core.bindContextMenu;
  }
});
Object.defineProperty(exports, "bindToggle", {
  enumerable: true,
  get: function () {
    return _core.bindToggle;
  }
});
Object.defineProperty(exports, "bindHover", {
  enumerable: true,
  get: function () {
    return _core.bindHover;
  }
});
Object.defineProperty(exports, "bindFocus", {
  enumerable: true,
  get: function () {
    return _core.bindFocus;
  }
});
Object.defineProperty(exports, "bindMenu", {
  enumerable: true,
  get: function () {
    return _core.bindMenu;
  }
});
Object.defineProperty(exports, "bindPopover", {
  enumerable: true,
  get: function () {
    return _core.bindPopover;
  }
});
Object.defineProperty(exports, "bindPopper", {
  enumerable: true,
  get: function () {
    return _core.bindPopper;
  }
});

var _react = require("react");

var _core = require("./core");

/* eslint-env browser */
if (!_react.useState) {
  throw new Error(`React.useState (added in 16.8.0) must be defined to use the hooks API`);
}

function usePopupState({
  parentPopupState,
  popupId,
  variant,
  disableAutoFocus
}) {
  const [state, setState] = (0, _react.useState)(_core.initCoreState);
  (0, _react.useEffect)(() => {
    if (!disableAutoFocus && popupId && typeof document === 'object') {
      const popup = document.getElementById(popupId);
      if (popup) popup.focus();
    }
  }, [popupId, state.anchorEl]);
  return (0, _react.useMemo)(() => (0, _core.createPopupState)({
    state,
    setState,
    parentPopupState,
    popupId,
    variant,
    disableAutoFocus
  }), [state, setState, parentPopupState, popupId, variant, disableAutoFocus]);
}