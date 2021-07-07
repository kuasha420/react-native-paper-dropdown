import React, { ReactNode } from "react";
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";
declare type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
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
    list: ReadonlyArray<{
        label: string;
        value: T;
        custom?: ReactNode;
    }>;
    dropDownContainerMaxHeight?: number;
    activeColor?: string;
    theme?: ReactNativePaper.Theme;
    containerStyle?: StyleProp<ViewStyle>;
}
declare type TextInputPropsWithoutTheme = Without<React.ComponentProps<typeof TextInput>, "theme">;
declare const DropDown: React.ForwardRefExoticComponent<DropDownPropsInterface<unknown> & React.RefAttributes<TouchableWithoutFeedback>>;
export default DropDown;
