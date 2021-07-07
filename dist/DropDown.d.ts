import React, { ReactNode } from "react";
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";
declare module "react" {
    function forwardRef<T, P = {}>(render: (props: P, ref: React.Ref<T>) => React.ReactElement | null): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
declare type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
export declare type DropDownListItem<T> = {
    label: string;
    value: T;
    custom?: ReactNode;
};
export declare type DropDownList<T> = ReadonlyArray<DropDownListItem<T>>;
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
declare type TextInputPropsWithoutTheme = Without<React.ComponentProps<typeof TextInput>, "theme">;
declare const DropDown: <T extends unknown>(props: DropDownPropsInterface<T> & React.RefAttributes<TouchableWithoutFeedback>) => React.ReactElement | null;
export default DropDown;
