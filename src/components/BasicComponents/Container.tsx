import PropTypes from "prop-types";
import React from "react";

import styles from "../../styles/BasicComponents/Container.module.scss";

type ContainerProps = {
  children?: React.ReactNode;
  invisible?: boolean;
  fullPage?: boolean;
  column?: boolean;
};

const Container: React.FC<ContainerProps> = (props): JSX.Element => {
  const { children, invisible, fullPage, column } = props;

  return (
    <div
      className={`
        ${styles.container}
        ${fullPage && styles.fullPage}
        ${invisible && styles.invisible} 
        ${column && styles.column}
      `}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  invisible: PropTypes.bool,
  fullPage: PropTypes.bool,
  column: PropTypes.bool,
};

export default Container;
