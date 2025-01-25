"use strict";

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

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-env browser */
const printedWarnings = {};

function warn(key, message) {
  if (printedWarnings[key]) return;
  printedWarnings[key] = true;
  console.error('[material-ui-popup-state] WARNING', message); // eslint-disable-line no-console
}

const initCoreState = {
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

function createPopupState({
  state,
  setState: _setState,
  parentPopupState,
  popupId,
  variant,
  disableAutoFocus
}) {
  const {
    isOpen,
    setAnchorElUsed,
    anchorEl,
    hovered,
    focused,
    _childPopupState,
    _deferNextOpen,
    _deferNextClose
  } = state; // use lastState to workaround cases where setState is called multiple times
  // in a single render (e.g. because of refs being called multiple times)

  let lastState = state;

  const setState = nextState => {
    if (hasChanges(lastState, nextState)) {
      _setState(lastState = { ...lastState,
        ...nextState
      });
    }
  };

  const setAnchorEl = _anchorEl => {
    setState({
      setAnchorElUsed: true,
      anchorEl: _anchorEl
    });
  };

  const toggle = eventOrAnchorEl => {
    if (isOpen) close(eventOrAnchorEl);else open(eventOrAnchorEl);
  };

  const open = eventOrAnchorEl => {
    const eventType = eventOrAnchorEl && eventOrAnchorEl.type;
    const currentTarget = eventOrAnchorEl && eventOrAnchorEl.currentTarget;

    if (eventType === 'touchstart') {
      setState({
        _deferNextOpen: true
      });
      return;
    }

    const doOpen = () => {
      if (!eventOrAnchorEl && !setAnchorElUsed) {
        warn('missingEventOrAnchorEl', 'eventOrAnchorEl should be defined if setAnchorEl is not used');
      }

      if (parentPopupState) {
        if (!parentPopupState.isOpen) return;

        parentPopupState._setChildPopupState(popupState);
      }

      const newState = {
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

  const close = arg => {
    const eventType = arg && arg.type;

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

    const doClose = () => {
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

  const setOpen = (nextOpen, eventOrAnchorEl) => {
    if (nextOpen) {
      open(eventOrAnchorEl);
    } else close(eventOrAnchorEl);
  };

  const onMouseLeave = event => {
    const relatedTarget = event.relatedTarget;

    if (hovered && !isElementInPopup(relatedTarget, popupState)) {
      close(event);
    }
  };

  const _setChildPopupState = _childPopupState => setState({
    _childPopupState
  });

  const popupState = {
    anchorEl,
    setAnchorEl,
    setAnchorElUsed,
    popupId,
    variant,
    isOpen,
    open,
    close,
    toggle,
    setOpen,
    onMouseLeave,
    disableAutoFocus: disableAutoFocus !== null && disableAutoFocus !== void 0 ? disableAutoFocus : Boolean(hovered || focused),
    _childPopupState,
    _setChildPopupState
  };
  return popupState;
}
/**
 * Creates a ref that sets the anchorEl for the popup.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function anchorRef({
  setAnchorEl
}) {
  return el => {
    if (el) setAnchorEl(el);
  };
}
/**
 * Creates props for a component that opens the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindTrigger({
  isOpen,
  open,
  popupId,
  variant
}) {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen ? popupId : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onClick: open,
    onTouchStart: open
  };
}
/**
 * Creates props for a component that opens the popup on its contextmenu event (right click).
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindContextMenu({
  isOpen,
  open,
  popupId,
  variant
}) {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen ? popupId : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onContextMenu: e => {
      e.preventDefault();
      open(e);
    }
  };
}
/**
 * Creates props for a component that toggles the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindToggle({
  isOpen,
  toggle,
  popupId,
  variant
}) {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen ? popupId : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onClick: toggle,
    onTouchStart: toggle
  };
}
/**
 * Creates props for a component that opens the popup while hovered.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindHover({
  isOpen,
  open,
  onMouseLeave,
  popupId,
  variant
}) {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen ? popupId : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onTouchStart: open,
    onMouseOver: open,
    onMouseLeave
  };
}
/**
 * Creates props for a component that opens the popup while focused.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindFocus({
  isOpen,
  open,
  close,
  popupId,
  variant
}) {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen ? popupId : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onFocus: open,
    onBlur: close
  };
}
/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindPopover({
  isOpen,
  anchorEl,
  close,
  popupId,
  onMouseLeave,
  disableAutoFocus
}) {
  return {
    id: popupId,
    anchorEl,
    open: isOpen,
    onClose: close,
    onMouseLeave,
    ...(disableAutoFocus && {
      disableAutoFocus: true,
      disableEnforceFocus: true,
      disableRestoreFocus: true
    })
  };
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


function bindMenu({
  isOpen,
  anchorEl,
  close,
  popupId,
  onMouseLeave,
  disableAutoFocus
}) {
  return {
    id: popupId,
    anchorEl,
    open: isOpen,
    onClose: close,
    onMouseLeave,
    ...(disableAutoFocus && {
      autoFocus: false,
      disableAutoFocusItem: true,
      disableAutoFocus: true,
      disableEnforceFocus: true,
      disableRestoreFocus: true
    })
  };
}
/**
 * Creates props for a `Popper` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindPopper({
  isOpen,
  anchorEl,
  popupId,
  onMouseLeave
}) {
  return {
    id: popupId,
    anchorEl,
    open: isOpen,
    onMouseLeave
  };
}

function getPopup({
  popupId
}) {
  return popupId && typeof document !== 'undefined' ? document.getElementById(popupId) // eslint-disable-line no-undef
  : null;
}

function isElementInPopup(element, popupState) {
  const {
    anchorEl,
    _childPopupState
  } = popupState;
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
  for (let key in nextState) {
    if (Object.prototype.hasOwnProperty.call(state, key) && state[key] !== nextState[key]) {
      return true;
    }
  }

  return false;
}