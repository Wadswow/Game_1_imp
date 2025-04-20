let runeClue = false;
let rockitem = false;
class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Hidden) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice);
            }
            if (runeClue && key == "Magic Room"){
                for (let choice of locationData.Hidden){
                    this.engine.addChoice(choice.Text, choice);
                }
            } else if (rockitem && key == "Rock Room"){
                for (let choice of locationData.Hidden){
                    this.engine.addChoice(choice.Text, choice);
                }
            }
        } else if (locationData.Choices){
            if (key == "Rune Clue"){
                runeClue = true;
            }
            if (key == "Rock Item"){
                rockitem = true;
            }
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.");
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');