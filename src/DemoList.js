import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { useVirtual } from "react-virtual";
import useDimensions from "react-cool-dimensions";
import faker from "faker";

const rows = faker.lorem.sentences(1000).split(". ");

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '100%',
  },
  root: {
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

export default function DemoList() {
  const parentRef = React.useRef();
  const { ref, width, height } = useDimensions();
  const estimateSize = React.useCallback(() => 56, [width, height]);
  const rowVirtualizer = useVirtual({
    size: rows.length,
    estimateSize,
    parentRef,
  });
  const classes = useStyles(rowVirtualizer);

  // without this the list initially only paints 2 items
  useEffect(() => {
    rowVirtualizer.scrollToIndex(0);
  }, []);

  return (
    <div ref={ref} className={classes.wrapper}>
      <div ref={parentRef} style={{ width: `${width}px`, height: `${height}px`, }} className={classes.root}>
        <List className={classes.list}>
          {rowVirtualizer.virtualItems.map(virtualRow => (
            <DemoListItem
              key={virtualRow.index}
              virtualRow={virtualRow}
              row={rows[virtualRow.index]}
            />
          ))}
        </List>
      </div>
    </div>
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

function DemoListItem({ virtualRow, row }) {
  const style = makeVirtualListItemStyle(virtualRow);
  return (
    <ListItem ref={virtualRow.measureRef} style={style}>
      <ListItemText>{row}</ListItemText>
    </ListItem>
  );
}
