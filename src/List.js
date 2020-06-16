import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { useVirtual } from "react-virtual";
import faker from "faker";
import Header from './Header';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 400,
    height: '100%',
    overflow: `auto`,
    border: `1px solid ${theme.palette.grey[900]}`,
    boxSizing: 'border-box'
  },
  list: rowVirtualizer => ({
    height: `${rowVirtualizer.totalSize}px`,
    width: "100%",
    position: "relative"
  })
}));

const rows = faker.lorem.sentences(1000).split(". ");

export default function App() {
  const parentRef = React.useRef();
  const estimateSize = React.useCallback(() => 35, []);
  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
    estimateSize
  });
  const classes = useStyles(rowVirtualizer);

  return (
    <>
      <div ref={parentRef} className={classes.root}>
        <List className={classes.list}>
          {rowVirtualizer.virtualItems.map(virtualRow => (
            <VirtualListItem
              key={virtualRow.index}
              virtualRow={virtualRow}
              row={rows[virtualRow.index]}
            />
          ))}
        </List>
      </div>
    </>
  );
}

const makeVirtualListItemStyle = virtualRow => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: `${rows[virtualRow.index]}px`,
  transform: `translateY(${virtualRow.start}px)`
});

function VirtualListItem({ virtualRow, row }) {
  const style = makeVirtualListItemStyle(virtualRow);
  return (
    <ListItem ref={virtualRow.measureRef} style={style}>
      <ListItemText>{row}</ListItemText>
    </ListItem>
  );
}
