"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPopupState = createPopupState;
exports.anchorRef = anchorRef;
exports.bindTrigger = bindTrigger;
exports.bindContextMenu = bindContextMenu;
exports.bindToggle = bindToggle;
exports.bindHover = bindHover;
exports.bindFocus = bindFocus;
exports.bindPopover = bindPopover;
exports.bindMenu = bindMenu;
exports.bindPopper = bindPopper;
exports.initCoreState = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var printedWarnings = {};

function warn(key, message) {
  if (printedWarnings[key]) return;
  printedWarnings[key] = true;
  console.error('[material-ui-popup-state] WARNING', message); // eslint-disable-line no-console
}

var initCoreState = {
  isOpen: false,
  setAnchorElUsed: false,
  anchorEl: null,
  hovered: false,
  focused: false,
  _childPopupState: null,
  _deferNextOpen: false,
  _deferNextClose: false
};
exports.initCoreState = initCoreState;

function createPopupState(_ref) {
  var state = _ref.state,
      _setState = _ref.setState,
      parentPopupState = _ref.parentPopupState,
      popupId = _ref.popupId,
      variant = _ref.variant,
      disableAutoFocus = _ref.disableAutoFocus;
  var isOpen = state.isOpen,
      setAnchorElUsed = state.setAnchorElUsed,
      anchorEl = state.anchorEl,
      hovered = state.hovered,
      focused = state.focused,
      _childPopupState = state._childPopupState,
      _deferNextOpen = state._deferNextOpen,
      _deferNextClose = state._deferNextClose; // use lastState to workaround cases where setState is called multiple times
  // in a single render (e.g. because of refs being called multiple times)

  var lastState = state;

  var setState = function setState(nextState) {
    if (hasChanges(lastState, nextState)) {
      _setState(lastState = _objectSpread(_objectSpread({}, lastState), nextState));
    }
  };

  var setAnchorEl = function setAnchorEl(_anchorEl) {
    setState({
      setAnchorElUsed: true,
      anchorEl: _anchorEl
    });
  };

  var toggle = function toggle(eventOrAnchorEl) {
    if (isOpen) close(eventOrAnchorEl);else open(eventOrAnchorEl);
  };

  var open = function open(eventOrAnchorEl) {
    var eventType = eventOrAnchorEl && eventOrAnchorEl.type;
    var currentTarget = eventOrAnchorEl && eventOrAnchorEl.currentTarget;

    if (eventType === 'touchstart') {
      setState({
        _deferNextOpen: true
      });
      return;
    }

    var doOpen = function doOpen() {
      if (!eventOrAnchorEl && !setAnchorElUsed) {
        warn('missingEventOrAnchorEl', 'eventOrAnchorEl should be defined if setAnchorEl is not used');
      }

      if (parentPopupState) {
        if (!parentPopupState.isOpen) return;

        parentPopupState._setChildPopupState(popupState);
      }

      var newState = {
        isOpen: true,
        hovered: eventType === 'mouseover',
        focused: eventType === 'focus'
      };

      if (currentTarget) {
        if (!setAnchorElUsed) {
          newState.anchorEl = currentTarget;
        }
      } else if (eventOrAnchorEl) {
        newState.anchorEl = eventOrAnchorEl;
      }

      setState(newState);
    };

    if (_deferNextOpen) {
      setState({
        _deferNextOpen: false
      });
      setTimeout(doOpen, 0);
    } else {
      doOpen();
    }
  };

  var close = function close(arg) {
    var eventType = arg && arg.type;

    switch (eventType) {
      case 'touchstart':
        setState({
          _deferNextClose: true
        });
        return;

      case 'blur':
        if (isElementInPopup(arg === null || arg === void 0 ? void 0 : arg.relatedTarget, popupState)) return;
        break;
    }

    var doClose = function doClose() {
      if (_childPopupState) _childPopupState.close();
      if (parentPopupState) parentPopupState._setChildPopupState(null);
      setState({
        isOpen: false,
        hovered: false,
        focused: false
      });
    };

    if (_deferNextClose) {
      setState({
        _deferNextClose: false
      });
      setTimeout(doClose, 0);
    } else {
      doClose();
    }
  };

  var setOpen = function setOpen(nextOpen, eventOrAnchorEl) {
    if (nextOpen) {
      open(eventOrAnchorEl);
    } else close(eventOrAnchorEl);
  };

  var onMouseLeave = function onMouseLeave(event) {
    var relatedTarget = event.relatedTarget;

    if (hovered && !isElementInPopup(relatedTarget, popupState)) {
      close(event);
    }
  };

  var _setChildPopupState = function _setChildPopupState(_childPopupState) {
    return setState({
      _childPopupState: _childPopupState
    });
  };

  var popupState = {
    anchorEl: anchorEl,
    setAnchorEl: setAnchorEl,
    setAnchorElUsed: setAnchorElUsed,
    popupId: popupId,
    variant: variant,
    isOpen: isOpen,
    open: open,
    close: close,
    toggle: toggle,
    setOpen: setOpen,
    onMouseLeave: onMouseLeave,
    disableAutoFocus: disableAutoFocus !== null && disableAutoFocus !== void 0 ? disableAutoFocus : Boolean(hovered || focused),
    _childPopupState: _childPopupState,
    _setChildPopupState: _setChildPopupState
  };
  return popupState;
}
/**
 * Creates a ref that sets the anchorEl for the popup.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function anchorRef(_ref2) {
  var setAnchorEl = _ref2.setAnchorEl;
  return function (el) {
    if (el) setAnchorEl(el);
  };
}
/**
 * Creates props for a component that opens the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindTrigger(_ref3) {
  var _ref4;

  var isOpen = _ref3.isOpen,
      open = _ref3.open,
      popupId = _ref3.popupId,
      variant = _ref3.variant;
  return _ref4 = {}, (0, _defineProperty2["default"])(_ref4, variant === 'popover' ? 'aria-controls' : 'aria-describedby', isOpen ? popupId : null), (0, _defineProperty2["default"])(_ref4, 'aria-haspopup', variant === 'popover' ? true : undefined), (0, _defineProperty2["default"])(_ref4, "onClick", open), (0, _defineProperty2["default"])(_ref4, "onTouchStart", open), _ref4;
}
/**
 * Creates props for a component that opens the popup on its contextmenu event (right click).
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindContextMenu(_ref5) {
  var _ref6;

  var isOpen = _ref5.isOpen,
      open = _ref5.open,
      popupId = _ref5.popupId,
      variant = _ref5.variant;
  return _ref6 = {}, (0, _defineProperty2["default"])(_ref6, variant === 'popover' ? 'aria-controls' : 'aria-describedby', isOpen ? popupId : null), (0, _defineProperty2["default"])(_ref6, 'aria-haspopup', variant === 'popover' ? true : undefined), (0, _defineProperty2["default"])(_ref6, "onContextMenu", function onContextMenu(e) {
    e.preventDefault();
    open(e);
  }), _ref6;
}
/**
 * Creates props for a component that toggles the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindToggle(_ref7) {
  var _ref8;

  var isOpen = _ref7.isOpen,
      toggle = _ref7.toggle,
      popupId = _ref7.popupId,
      variant = _ref7.variant;
  return _ref8 = {}, (0, _defineProperty2["default"])(_ref8, variant === 'popover' ? 'aria-controls' : 'aria-describedby', isOpen ? popupId : null), (0, _defineProperty2["default"])(_ref8, 'aria-haspopup', variant === 'popover' ? true : undefined), (0, _defineProperty2["default"])(_ref8, "onClick", toggle), (0, _defineProperty2["default"])(_ref8, "onTouchStart", toggle), _ref8;
}
/**
 * Creates props for a component that opens the popup while hovered.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindHover(_ref9) {
  var _ref10;

  var isOpen = _ref9.isOpen,
      open = _ref9.open,
      onMouseLeave = _ref9.onMouseLeave,
      popupId = _ref9.popupId,
      variant = _ref9.variant;
  return _ref10 = {}, (0, _defineProperty2["default"])(_ref10, variant === 'popover' ? 'aria-controls' : 'aria-describedby', isOpen ? popupId : null), (0, _defineProperty2["default"])(_ref10, 'aria-haspopup', variant === 'popover' ? true : undefined), (0, _defineProperty2["default"])(_ref10, "onTouchStart", open), (0, _defineProperty2["default"])(_ref10, "onMouseOver", open), (0, _defineProperty2["default"])(_ref10, "onMouseLeave", onMouseLeave), _ref10;
}
/**
 * Creates props for a component that opens the popup while focused.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindFocus(_ref11) {
  var _ref12;

  var isOpen = _ref11.isOpen,
      open = _ref11.open,
      close = _ref11.close,
      popupId = _ref11.popupId,
      variant = _ref11.variant;
  return _ref12 = {}, (0, _defineProperty2["default"])(_ref12, variant === 'popover' ? 'aria-controls' : 'aria-describedby', isOpen ? popupId : null), (0, _defineProperty2["default"])(_ref12, 'aria-haspopup', variant === 'popover' ? true : undefined), (0, _defineProperty2["default"])(_ref12, "onFocus", open), (0, _defineProperty2["default"])(_ref12, "onBlur", close), _ref12;
}
/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindPopover(_ref13) {
  var isOpen = _ref13.isOpen,
      anchorEl = _ref13.anchorEl,
      close = _ref13.close,
      popupId = _ref13.popupId,
      onMouseLeave = _ref13.onMouseLeave,
      disableAutoFocus = _ref13.disableAutoFocus;
  return _objectSpread({
    id: popupId,
    anchorEl: anchorEl,
    open: isOpen,
    onClose: close,
    onMouseLeave: onMouseLeave
  }, disableAutoFocus && {
    disableAutoFocus: true,
    disableEnforceFocus: true,
    disableRestoreFocus: true
  });
}
/**
 * Creates props for a `Menu` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */

/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindMenu(_ref14) {
  var isOpen = _ref14.isOpen,
      anchorEl = _ref14.anchorEl,
      close = _ref14.close,
      popupId = _ref14.popupId,
      onMouseLeave = _ref14.onMouseLeave,
      disableAutoFocus = _ref14.disableAutoFocus;
  return _objectSpread({
    id: popupId,
    anchorEl: anchorEl,
    open: isOpen,
    onClose: close,
    onMouseLeave: onMouseLeave
  }, disableAutoFocus && {
    autoFocus: false,
    disableAutoFocusItem: true,
    disableAutoFocus: true,
    disableEnforceFocus: true,
    disableRestoreFocus: true
  });
}
/**
 * Creates props for a `Popper` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindPopper(_ref15) {
  var isOpen = _ref15.isOpen,
      anchorEl = _ref15.anchorEl,
      popupId = _ref15.popupId,
      onMouseLeave = _ref15.onMouseLeave;
  return {
    id: popupId,
    anchorEl: anchorEl,
    open: isOpen,
    onMouseLeave: onMouseLeave
  };
}

function getPopup(_ref16) {
  var popupId = _ref16.popupId;
  return popupId && typeof document !== 'undefined' ? document.getElementById(popupId) // eslint-disable-line no-undef
  : null;
}

function isElementInPopup(element, popupState) {
  var anchorEl = popupState.anchorEl,
      _childPopupState = popupState._childPopupState;
  return isAncestor(anchorEl, element) || isAncestor(getPopup(popupState), element) || _childPopupState != null && isElementInPopup(element, _childPopupState);
}

function isAncestor(parent, child) {
  if (!parent) return false;

  while (child) {
    if (child === parent) return true;
    child = child.parentElement;
  }

  return false;
}

function hasChanges(state, nextState) {
  for (var key in nextState) {
    if (Object.prototype.hasOwnProperty.call(state, key) && state[key] !== nextState[key]) {
      return true;
    }
  }

  return false;
}