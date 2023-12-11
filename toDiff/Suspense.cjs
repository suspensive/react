"use client"
"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Suspense.tsx
var Suspense_exports = {};
__export(Suspense_exports, {
  Suspense: () => Suspense,
  SuspenseContext: () => SuspenseContext,
  withSuspense: () => withSuspense
});
module.exports = __toCommonJS(Suspense_exports);
var import_react8 = require("react");

// src/hooks/useIsChanged.ts
var useIsChanged = (value) => usePrevious(value) !== value;

// src/hooks/useIsClient.ts
var import_react2 = require("react");

// src/hooks/useIsomorphicLayoutEffect.ts
var import_react = require("react");
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;

// src/hooks/useIsClient.ts
var useIsClient = () => {
  const [isClient, setIsClient] = (0, import_react2.useState)(false);
  useIsomorphicLayoutEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

// src/hooks/usePrevious.ts
var import_react3 = require("react");
var usePrevious = (value) => {
  const ref = (0, import_react3.useRef)(value);
  (0, import_react3.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

// src/hooks/useTimeout.ts
var import_react4 = require("react");
var useTimeout = (fn, ms) => {
  const fnRef = (0, import_react4.useRef)(fn);
  useIsomorphicLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  (0, import_react4.useEffect)(() => {
    const id = setTimeout(fnRef.current, ms);
    return () => clearTimeout(id);
  }, [ms]);
};

// src/Delay.tsx
var import_react5 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var Delay = ({ ms, children }) => {
  var _a;
  const delayContextValue = (0, import_react5.useContext)(DelayContext);
  const delayMs = (_a = ms != null ? ms : delayContextValue.ms) != null ? _a : 0;
  const [isDelayed, setIsDelayed] = (0, import_react5.useState)(delayMs === 0);
  useTimeout(() => setIsDelayed(true), delayMs);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: isDelayed ? children : null });
};
if (process.env.NODE_ENV !== "production") {
  Delay.displayName = "Delay";
}
var DelayContext = (0, import_react5.createContext)({ ms: 0 });

// src/ErrorBoundary.tsx
var import_react7 = require("react");

// src/ErrorBoundaryGroup.tsx
var import_react6 = require("react");

// src/utils/assert.ts
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
assert.message = {
  useErrorBoundary: {
    onlyInChildrenOfErrorBoundary: "useErrorBoundary: this hook should be called in ErrorBoundary.props.children"
  },
  useErrorBoundaryFallbackProps: {
    onlyInFallbackOfErrorBoundary: "useErrorBoundaryFallbackProps: this hook should be called in ErrorBoundary.props.fallback"
  },
  useErrorBoundaryGroup: {
    onlyInChildrenOfErrorBoundaryGroup: "useErrorBoundaryGroup: this hook should be called in ErrorBoundaryGroup.props.children"
  }
};

// src/utils/hasResetKeysChanged.ts
var hasResetKeysChanged = (a = [], b = []) => a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));

// src/ErrorBoundaryGroup.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var ErrorBoundaryGroupContext = (0, import_react6.createContext)(void 0);
if (process.env.NODE_ENV !== "production") {
  ErrorBoundaryGroupContext.displayName = "ErrorBoundaryGroupContext";
}
var increase = (prev) => prev + 1;
var ErrorBoundaryGroup = ({ blockOutside = false, children }) => {
  const [resetKey, reset] = (0, import_react6.useReducer)(increase, 0);
  const parentGroup = (0, import_react6.useContext)(ErrorBoundaryGroupContext);
  const isParentGroupResetKeyChanged = useIsChanged(parentGroup == null ? void 0 : parentGroup.resetKey);
  (0, import_react6.useEffect)(() => {
    if (!blockOutside && isParentGroupResetKeyChanged) {
      reset();
    }
  }, [isParentGroupResetKeyChanged, blockOutside]);
  const value = (0, import_react6.useMemo)(() => ({ reset, resetKey }), [resetKey]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ErrorBoundaryGroupContext.Provider, { value, children });
};
if (process.env.NODE_ENV !== "production") {
  ErrorBoundaryGroup.displayName = "ErrorBoundaryGroup";
}
var ErrorBoundaryGroupReset = ({
  trigger: Trigger
}) => {
  const errorBoundaryGroup = useErrorBoundaryGroup();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Trigger, { reset: errorBoundaryGroup.reset });
};
ErrorBoundaryGroup.Reset = ErrorBoundaryGroupReset;
var useErrorBoundaryGroup = () => {
  const group = (0, import_react6.useContext)(ErrorBoundaryGroupContext);
  assert(group != null, assert.message.useErrorBoundaryGroup.onlyInChildrenOfErrorBoundaryGroup);
  return (0, import_react6.useMemo)(
    () => ({
      /**
       * When you want to reset multiple ErrorBoundaries as children of ErrorBoundaryGroup, You can use this reset
       */
      reset: group.reset
    }),
    [group.reset]
  );
};

// src/ErrorBoundary.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var initialErrorBoundaryState = {
  isError: false,
  error: null
};
var BaseErrorBoundary = class extends import_react7.Component {
  constructor() {
    super(...arguments);
    this.state = initialErrorBoundaryState;
    this.reset = () => {
      var _a, _b;
      (_b = (_a = this.props).onReset) == null ? void 0 : _b.call(_a);
      this.setState(initialErrorBoundaryState);
    };
  }
  static getDerivedStateFromError(error) {
    return { isError: true, error };
  }
  componentDidUpdate(prevProps, prevState) {
    const { isError } = this.state;
    const { resetKeys } = this.props;
    if (isError && prevState.isError && hasResetKeysChanged(prevProps.resetKeys, resetKeys)) {
      this.reset();
    }
  }
  componentDidCatch(error, info) {
    var _a, _b;
    (_b = (_a = this.props).onError) == null ? void 0 : _b.call(_a, error, info);
  }
  render() {
    const { children, fallback } = this.props;
    if (this.state.isError && typeof fallback === "undefined") {
      if (process.env.NODE_ENV !== "production") {
        console.error("ErrorBoundary of @suspensive/react requires a defined fallback");
      }
      throw this.state.error;
    }
    let childrenOrFallback = children;
    if (this.state.isError) {
      if (typeof fallback === "function") {
        const FallbackComponent = fallback;
        childrenOrFallback = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FallbackComponent, { error: this.state.error, reset: this.reset });
      } else {
        childrenOrFallback = fallback;
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBoundaryContext.Provider, { value: __spreadProps(__spreadValues({}, this.state), { reset: this.reset }), children: childrenOrFallback });
  }
};
var ErrorBoundary = (0, import_react7.forwardRef)((props, ref) => {
  var _a;
  const group = (_a = (0, import_react7.useContext)(ErrorBoundaryGroupContext)) != null ? _a : { resetKey: 0 };
  const resetKeys = [group.resetKey, ...props.resetKeys || []];
  const baseErrorBoundaryRef = (0, import_react7.useRef)(null);
  (0, import_react7.useImperativeHandle)(ref, () => ({
    reset: () => {
      var _a2;
      return (_a2 = baseErrorBoundaryRef.current) == null ? void 0 : _a2.reset();
    }
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(BaseErrorBoundary, __spreadProps(__spreadValues({}, props), { resetKeys, ref: baseErrorBoundaryRef }));
});
if (process.env.NODE_ENV !== "production") {
  ErrorBoundary.displayName = "ErrorBoundary";
}
var ErrorBoundaryContext = (0, import_react7.createContext)(null);

// src/wrap.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var WrapWithoutCSROnly = class {
  constructor(wrappers) {
    this.wrappers = wrappers;
    this.Suspense = (props = {}) => {
      this.wrappers.unshift([Suspense, props]);
      return this;
    };
    this.ErrorBoundary = (props) => {
      this.wrappers.unshift([ErrorBoundary, props]);
      return this;
    };
    this.ErrorBoundaryGroup = (props = {}) => {
      this.wrappers.unshift([ErrorBoundaryGroup, props]);
      return this;
    };
    this.Delay = (props = {}) => {
      this.wrappers.unshift([Delay, props]);
      return this;
    };
    this.on = (Component2) => {
      const WrappedComponent = (props) => this.wrappers.reduce(
        (acc, [WrapperComponent, wrapperProps]) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(WrapperComponent, __spreadProps(__spreadValues({}, wrapperProps), { children: acc })),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Component2, __spreadValues({}, props))
      );
      if (process.env.NODE_ENV !== "production") {
        WrappedComponent.displayName = this.wrappers.reduce(
          (acc, [WrapperComponent]) => `with${WrapperComponent.displayName}(${acc})`,
          Component2.displayName || Component2.name || "Component"
        );
      }
      return WrappedComponent;
    };
  }
};
var createWrap = () => {
  const wrappers = [];
  const wrap2 = new WrapWithoutCSROnly(wrappers);
  wrap2.Suspense.CSROnly = (props = {}) => {
    wrappers.unshift([Suspense.CSROnly, props]);
    return wrap2;
  };
  return wrap2;
};
var wrapSuspense = (props = {}) => createWrap().Suspense(props);
wrapSuspense.CSROnly = (props = {}) => createWrap().Suspense.CSROnly(props);
var wrapErrorBoundary = (props) => createWrap().ErrorBoundary(props);
var wrapErrorBoundaryGroup = (props) => createWrap().ErrorBoundaryGroup(props);
var wrapDelay = (props = {}) => createWrap().Delay(props);
var wrap = {
  Suspense: wrapSuspense,
  ErrorBoundary: wrapErrorBoundary,
  ErrorBoundaryGroup: wrapErrorBoundaryGroup,
  Delay: wrapDelay
};

// src/Suspense.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var SuspenseContext = (0, import_react8.createContext)({ fallback: void 0 });
var useFallbackWithContext = (fallback) => {
  const contextFallback = (0, import_react8.useContext)(SuspenseContext).fallback;
  return fallback === null ? null : fallback != null ? fallback : contextFallback;
};
var DefaultSuspense = (props) => {
  const fallback = useFallbackWithContext(props.fallback);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react8.Suspense, __spreadProps(__spreadValues({}, props), { fallback }));
};
if (process.env.NODE_ENV !== "production") {
  DefaultSuspense.displayName = "Suspense";
}
var CSROnly = (props) => {
  const isClient = useIsClient();
  const fallback = useFallbackWithContext(props.fallback);
  return isClient ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react8.Suspense, __spreadProps(__spreadValues({}, props), { fallback })) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children: fallback });
};
if (process.env.NODE_ENV !== "production") {
  CSROnly.displayName = "Suspense.CSROnly";
}
var Suspense = Object.assign(DefaultSuspense, {
  /**
   * CSROnly make Suspense can be used in SSR framework like Next.js with React 17 or under
   * @see {@link https://suspensive.org/docs/react/Suspense}
   */
  CSROnly
});
var withSuspense = Object.assign(
  (component, suspenseProps = {}) => wrap.Suspense(suspenseProps).on(component),
  {
    /**
     * @deprecated Use wrap.Suspense.CSROnly().on as alternatives
     */
    CSROnly: (component, suspenseProps = {}) => wrap.Suspense.CSROnly(suspenseProps).on(component)
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Suspense,
  SuspenseContext,
  withSuspense
});
//# sourceMappingURL=Suspense.cjs.map