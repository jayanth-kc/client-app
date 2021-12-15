import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponenet from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default observer(function ActivityDetails(){
    const {activityStore} = useStore();
    const {selectedActivity:activity} =activityStore;
    
    if(!activity) return <LoadingComponenet />

    return(
        <Card fluid>
            <Image src={`/assets/categoryimages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description> 
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content="Edit" onClick={ () => activityStore.openForm(activity.id)}></Button>
                    <Button onClick={activityStore.cancelSelectedActivity} basic color='grey' content="Cancel"></Button>
                </Button.Group>
            </Card.Content>
         </Card>
    );
})