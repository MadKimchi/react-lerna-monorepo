import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonWrapper: {
    justifyContent: 'flex-end'
  },
  button: {
    marginLeft: '5px'
  },
  control: {
    paddingBottom: '10px'
  }
});