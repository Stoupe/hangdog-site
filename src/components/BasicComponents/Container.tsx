import React from "react";
import { Container as MuiContainer, ContainerTypeMap } from "@material-ui/core";

import styles from "../../styles/BasicComponents/Container.module.scss";

type ContainerProps = {
  containerPropsObj?: ContainerTypeMap;

  children?: React.ReactNode;
  invisible?: boolean;
  fullPage?: boolean;
  column?: boolean;
  title?: string;
  className?: string;
};

const Container = (props: ContainerProps): JSX.Element => {
  const {
    children,
    containerPropsObj,
    column,
    fullPage,
    invisible,
    title,
    className,
  } = props;

  const defaultContainerProps: ContainerTypeMap = {
    props: { maxWidth: false },
    defaultComponent: "div",
  };

  // const { props: containerProps } = containerPropsObj ?? { maxWidth: false };

  const containerProps = containerPropsObj
    ? containerPropsObj.props
    : defaultContainerProps.props;

  return (
    <MuiContainer
      style={{ display: "flex" }}
      maxWidth={false}
      // {...containerProps}
      className={`
        ${styles[className]} 
    ${styles.container}
    ${fullPage && styles.fullPage}
    ${invisible && styles.invisible} 
    ${column && styles.column}
  `}
    >
      {children}
    </MuiContainer>
  );
};

export default Container;
