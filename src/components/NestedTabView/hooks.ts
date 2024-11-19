import React, {
  useState,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { Dimensions } from 'react-native';
import { SharedValue, AnimatedRef } from 'react-native-reanimated';
import {
  NestedContextProps,
  NestedTabViewProps,
  NestedTabViewVerifyProps,
} from './type';

interface ChildInfoType {
  scrollValue: SharedValue<number>;
  scrollRef: AnimatedRef<any>;
}

export const useNestRegister = () => {
  const [childInfo, setChildInfo] = useState<{
    [index: number]: ChildInfoType;
  }>({});

  // 子scroll的Native容器引用ref
  const [childNativeRefs, setChildNativeRefs] = useState<
    React.RefObject<any>[]
  >([]);

  const isReady = useMemo(() => {
    return Object.keys(childInfo).length > 0 && childNativeRefs.length > 0;
  }, [childInfo, childNativeRefs]);

  // 用Gesture.Native包裹内部scrollview并获取此ref
  const registerNativeRef = useCallback(
    (ref: React.RefObject<any>) => {
      if (!ref) return;
      const findRef = childNativeRefs?.find(
        (item) => item.current === ref.current
      );
      if (findRef) return;
      setChildNativeRefs((prechildRefs) => {
        return [...prechildRefs, ref];
      });
    },
    [childNativeRefs]
  );

  const registerChildInfo = useCallback(
    (
      index: number,
      scrollValue: SharedValue<number>,
      scrollRef: AnimatedRef<any>
    ) => {
      setChildInfo((preChildInfo) => {
        return {
          ...preChildInfo,
          [index]: {
            scrollValue,
            scrollRef,
          },
        };
      });
    },
    []
  );

  return {
    registerNativeRef,
    childNativeRefs,
    registerChildInfo,
    childInfo,
    isReady,
  };
};

export const NestedContext = createContext<NestedContextProps>(
  {} as NestedContextProps
);
export const useNested = () => useContext(NestedContext);

const { width } = Dimensions.get('window');

export const useVerifyProps = (
  props: NestedTabViewProps
): NestedTabViewVerifyProps => {
  const {
    tabs,
    tabBarflex,
    tabScrollEnabled,
    spacing,
    showSeparator,
    separatorComponent,
    hideSlider,
    sliderComponent,
    defaultSliderStyle,
    tabBarItemStyle,
    tabBarItemTitleStyle,
    activeTextColor,
    inactiveTextColor,
    tabStyle,

    pageScrollEnabled,
    bounces,
    gestureBack,
    pageStyle,

    onTabPress,
    onPageScroll,
    onPageScrollStateChanged,
    onPageSelected,

    initialIndex,
    style,
    renderHeader,
    stickyHeight,
    children,
  } = props;

  if (!Array.isArray(tabs)) {
    throw new Error('TabBar tabs must be array');
  }
  if (tabs.length <= 0) {
    throw new Error("TabBar tabs can't be empty");
  }

  const pageSize = React.Children.count(children);
  if (pageSize === 0) {
    throw new Error('PageView must be contains at least one chid');
  }

  if (pageSize !== tabs.length) {
    throw new Error('TabView tabs length must be equal children');
  }

  let contentSize: number = width;
  if (style && style.width) {
    if (typeof style.width === 'number') {
      contentSize = style.width;
    } else {
      throw new Error('TabView width only support number');
    }
  }

  const tabProps = {
    tabs,
    tabBarflex,
    tabScrollEnabled,
    spacing,
    showSeparator,
    separatorComponent,
    hideSlider,
    sliderComponent,
    defaultSliderStyle,
    tabBarItemStyle,
    tabBarItemTitleStyle,
    activeTextColor,
    inactiveTextColor,
    style: { width: contentSize, ...tabStyle },
    initialTab: initialIndex,
  };

  const pageProps = {
    pageScrollEnabled,
    bounces,
    gestureBack,
    style: { flex: 1, width: contentSize, ...pageStyle },
    initialPage: initialIndex,
  };

  return {
    pageProps,
    tabProps,
    style,
    children,
    renderHeader,
    stickyHeight,
    initialIndex,

    onTabPress,
    onPageScroll,
    onPageScrollStateChanged,
    onPageSelected,
  };
};
