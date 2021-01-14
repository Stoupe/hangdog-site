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
};

const Container = (props: ContainerProps): JSX.Element => {
  const {
    children,
    containerPropsObj,
    column,
    fullPage,
    invisible,
    title,
  } = props;

  const { props: containerProps } = containerPropsObj || {};

  return (
    <>
      {title && <h1>{title}</h1>}
      <MuiContainer
        {...containerProps}
        disableGutters
        className={`
    ${styles.container}
    ${fullPage && styles.fullPage}
    ${invisible && styles.invisible} 
    ${column && styles.column}
  `}
      >
        {children}
      </MuiContainer>
    </>

  );
};

export default Container;
