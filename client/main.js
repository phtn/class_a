import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
//import muiThemeable from 'material-ui/styles/muiThemeable';

const Main = ({props}) => (
  <div>
  <GridList cols={2}>
    <Card className="cards">
      <CardHeader title={<Chip><Avatar/> Enceladus </Chip>} subtitle="Location" />
      <CardActions>
        <FlatButton label="like" primary={true} />
      </CardActions>
    </Card>

    <Card className="cards">
      <CardHeader title="Name" subtitle="Location" />
      <CardActions>
        <FlatButton label="like" primary={true} />
      </CardActions>
    </Card>
  </GridList>
  </div>
)
export default Main
