import {
    GridColumnMenuContainer,
    GridColumnMenuFilterItem, //docs for v6 new names: https://mui.com/x/migration/migration-data-grid-v5/
    GridColumnMenuHideItem,
  } from "@mui/x-data-grid";
  
  const CustomColumnMenu = (props) => {
    const { hideMenu, currentColumn, open } = props;
    return (
      <GridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        open={open}
      >
        <GridColumnMenuFilterItem onClick={hideMenu} column={currentColumn} />
        <GridColumnMenuHideItem onClick={hideMenu} column={currentColumn} />
      </GridColumnMenuContainer>
    );
  };
  
  export default CustomColumnMenu;