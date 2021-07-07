import React, { forwardRef, ReactNode, useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { Menu, TextInput, TouchableRipple, useTheme } from "react-native-paper";

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export type DropDownListItem<T> = {
  label: string;
  value: T;
  custom?: ReactNode;
};

export type DropDownList<T> = ReadonlyArray<DropDownListItem<T>>;

export interface DropDownPropsInterface<T> {
  visible: boolean;
  onDismiss: () => void;
  showDropDown: () => void;
  value: T;
  setValue?: (_value: T) => void;
  label?: string | undefined;
  placeholder?: string | undefined;
  mode?: "outlined" | "flat" | undefined;
  inputProps?: TextInputPropsWithoutTheme;
  list: DropDownList<T>;
  dropDownContainerMaxHeight?: number;
  activeColor?: string;
  theme?: ReactNativePaper.Theme;
  containerStyle?: StyleProp<ViewStyle>;
}

type TextInputPropsWithoutTheme = Without<
  React.ComponentProps<typeof TextInput>,
  "theme"
>;

const DropDownComponent = <T extends unknown>(
  props: DropDownPropsInterface<T>,
  ref: React.ForwardedRef<TouchableWithoutFeedback>
) => {
  const activeTheme = useTheme();
  const {
    visible,
    onDismiss,
    showDropDown,
    value,
    setValue,
    activeColor,
    mode,
    label,
    placeholder,
    inputProps,
    list,
    dropDownContainerMaxHeight,
    theme,
    containerStyle,
  } = props;
  const [displayValue, setDisplayValue] = useState("");
  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setInputLayout(event.nativeEvent.layout);
  };

  useEffect(() => {
    const _label = list.find((_) => _.value === value)?.label;
    if (_label) {
      setDisplayValue(_label);
    }
  }, [list, value]);

  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      theme={theme}
      anchor={
        <TouchableRipple ref={ref} onPress={showDropDown} onLayout={onLayout}>
          <View style={containerStyle} pointerEvents={"none"}>
            <TextInput
              value={displayValue}
              mode={mode}
              label={label}
              placeholder={placeholder}
              pointerEvents={"none"}
              theme={theme}
              {...inputProps}
            />
          </View>
        </TouchableRipple>
      }
      style={[
        {
          maxWidth: inputLayout?.width,
          width: inputLayout?.width,
          marginTop: inputLayout?.height,
        },
      ]}
    >
      <ScrollView style={{ maxHeight: dropDownContainerMaxHeight || 200 }}>
        {list.map((_item, _index) => (
          <Menu.Item
            key={_index}
            titleStyle={{
              color:
                value === _item.value
                  ? activeColor || (theme || activeTheme).colors.primary
                  : theme || activeTheme
                  ? (theme || activeTheme).colors.text
                  : undefined,
            }}
            onPress={() => {
              setValue?.(_item.value);
              if (onDismiss) {
                onDismiss();
              }
            }}
            title={_item.custom || _item.label}
            style={{ width: inputLayout?.width }}
          />
        ))}
      </ScrollView>
    </Menu>
  );
};

const DropDown = forwardRef(DropDownComponent);

export default DropDown;
