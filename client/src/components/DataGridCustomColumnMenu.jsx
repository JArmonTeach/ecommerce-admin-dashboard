import {
    GridColumnMenuContainer,
    GridColumnMenuFilterItem, //docs for v6 new names: https://mui.com/x/migration/migration-data-grid-v5/
    GridColumnMenuHideItem,
  } from "@mui/x-data-grid";
  
const CustomColumnMenu = (props) => {
  const { hideMenu, colDef, open } = props;
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      colDef={colDef}
      open={open}
    >
      <GridColumnMenuFilterItem onClick={hideMenu} colDef={colDef} />
      <GridColumnMenuHideItem onClick={hideMenu} colDef={colDef} />
    </GridColumnMenuContainer>
  );
};
  
  export default CustomColumnMenu;