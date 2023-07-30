// formatting it this way in case I want to convert into json later 

const badQuotes = [
    {
        "text": "Run"
    }, 
    {
        "text": "Life is short, so might as well spend your life savings on anime figurines."
    },
    {
        "text": "#YOLO"
    }, 
    {
        "text": "You don't have to be faster than the bear, you just have to not be the slowest person running away from the bear."
    }, 
    {
        "text": "If you're reading this, it means you can read."
    }, 
    {
        "text": "I'm never going to give you up, or let you down."
    }, 
    {
        "text": "When you squeeze an orange, orange juice comes out because that's what's inside."
    }, 
    {
        "text": "Did you know that wombats poop cubes?"
    }, 
    {
        "text": "There is no angry way to say 'bubbles.'"
    }, 
    {
        "text": "When solving a problem, it always helps if you know the answer."
    }, 
    {
        "text": "If Digiorno's isn't delivery, then how is it delivered to the store? Deliver us the truth!"
    }, 
    {
        "text": "It's not too late to go back to bed."
    }, 
    {
        "text": "A vanilla soy latte is a kind of three-bean soup."
    }, 
    {
        "text": "Bring champagne for your real friends and real pain for your sham friends."
    }, 
    {
        "text": "Life is too short to avoid carbs."
    }, 
    {
        "text": "Negative self-talk is not very punk rock."
    }, 
    {
        "text": "Buying Twitter was a bad idea."
    }, 
    {
        "text": "Would you still love me if I was a worm?"
    }, 
    {
        "text": "When life gives you lemons, use this recipe I found on the internet for lemon bars."
    }, 
    {
        "text": "There's nothing wrong with you that an expensive operation can't prolong."
    }, 
    {
        "text": "Never put off till tomorrow what you can do the day after tomorrow."
    }, 
    {
        "text": "Elder Scrolls online."
    }, 
    {
        "text": "Why are you in my house?"
    }, 
    {
        "text": "Strive for the gentle eyes, funny laugh, and immense bite strength of a hyena."
    },
    {
        "text": "Please go touch grass."
    }, 
    {
        "text": "It's okay to not like someone even if they have done nothing wrong."
    }, 
    {
        "text": "If I had superpowers, I would use them to evade taxes."
    },
    {
        "text": "Yeah I'll buy a dogecoin."
    }, 
    {
        "text": "I will put forth just enough effort to avoid a lawsuit."
    }, 
    {
        "text": "Konnichiwa"
    }, 
    {
        "text": "Shoutout to all the gamer girls out there"
    }, 
    {
        "text": "Beware the ides of March."
    },
    {
        "text": "Don't cry, I got you McDonalds."
    },
    {
        "text": "It looks like you snoozed and you losed."
    },
    {
        "text": "There are in-app purchases."
    }, 
    {
        "text": "Maybe it's time to log off for the day."
    },
    {
        "text": "Cringe"
    }, 
    {
        "text": "Naruto wouldn't want you to be depressed."
    },
    {
        "text": "<コ:彡"
    },
    {
        "text": "You are more than your favorite Power Ranger."
    },
    {
        "text": "Aw man, not you too, Brutus"
    }, 
    {
        "text": "What is a bitcoin?"
    },
    {
        "text": "When the moon hits your eye like a big pizza pie, that's amore. When you're swimming in the sea and an eel bites your feet, that's a moray."
    },
    {
        "text": "On Wednesdays we wear pink."
    }, 
    {
        "text": "I don't think I can gaslight gatekeep girlboss my way out of this one, boys."
    },
    {
        "text": "Running from the cops is the ultimate double-or-nothing."
    }, 
    {
        "text": "Did you try turning it off and on again?"
    },
    {
        "text": "The Batmobile is probably uninsured."
    },
    {
        "text": "Wanna go back to my place and look at my NFT collection?"
    },
    {
        "text": "In the name of the moon, I'll punish you!"
    },
    {
        "text": "Seems like a skill issue."
    },
    {
        "text": "You can fix him."
    },
    {
        "text": "That's not very Tumblr Sexyman of you."
    },
    {
        "text": "I may be a Barbie girl, but lately I've been feeling like I don't live in a Barbie world."
    },
    {
        "text": "If you or a loved one was diagnosed with Mesothelioma, you may be entitled to financial compensation."
    },
    {
        "text": "It's Wednesday my dudes."
    },
    {
        "text": "Do it for the Vine"
    }, 
    {
        "text": "I'm sorry, I didn't see you there. I was too busy blocking out the haters."
    },
    {
        "text": "We got a number one Victory Royale / Yeah, Fortnite, we 'bout to get down"
    },
    {
        "text": "She was a dancing queen, young and sweet, only seventeen."
    },
    {
        "text": "Are we human, or are we dancer?"
    },
    {
        "text": "I don't like sand. It's coarse and rough and irritating and it gets everywhere."
    },
    {
        "text": "I am your father."
    },
    {
        "text": "Call me Ishmael."
    },
    {
        "text": "Hey Ferb, I know what we're gonna do today!"
    }, 
    {
        "text": "Is mayonnaise an instrument?"
    },
    {
        "text": "No, this is Patrick."
    },
    {
        "text": "Goodbye, everyone. I'll remember you all in therapy."
    },
    {
        "text": "Anything can be a UFO if you're bad enough at identifying things."
    },
    {
        "text": "I'm Team Edward."
    },
    {
        "text": "I'm Team Jacob."
    },
    {
        "text": "She doesn't even go here!"
    },
    {
        "text": "Oh my god, they were roommates."
    },
    {
        "text": "Anything for you, Beyonce"
    },
    {
        "text": "That's not very poggers of you."
    },
    {
        "text": "Will you be the Naruto to my Sasuke?"
    },
    {
        "text": "Et tu, pogchamp?"
    },
    {
        "text": "Tis but a flesh wound."
    }, 
    {
        "text": "I'm gonna crease your J's, Spider-Man."
    },
    {
        "text": "This is the skin of a killer, Bella."
    },
    {
        "text": "uwu"
    }
];

const fakeAuthors = [
    {
        "author": "Ghandi"
    }, 
    {
        "author": "Buddha"
    },
    {
        "author": "Elon Musk"
    }, 
    {
        "author": "Jeff Bezos"
    },
    {
        "author": "Bill Gates"
    },
    {
        "author": "Mark Zuckerberg"
    },
    {
        "author": "Mark Twain"
    },
    {
        "author": "Oscar Wilde"
    },
    {
        "author": "Jane Austen"
    },
    {
        "author": "Barbie"
    }, 
    {
        "author": "Gandalf"
    }, 
    {
        "author": "David Byrne"
    }, 
    {
        "author": "ChatGPT"
    }, 
    {
        "author": "Thomas Edison"
    }, 
    {
        "author": "Neil DeGrasse Tyson"
    },
    {
        "author": "Aristotle"
    }, 
    {
        "author": "Betty White"
    },
    {
        "author": "Spock"
    },
    {
        "author": "Marge Simpson"
    }, 
    {
        "author": "Beyonce"
    },
    {
        "author": "Batman"
    },
    {
        "author": "Julius Caesar"
    },
    {
        "author": "Meryl Streep"
    },
    {
        "author": "Marilyn Monroe"
    },
    {
        "author": "Sun Tzu"
    },
    {
        "author": "Albert Einstein"
    },
    {
        "author": "John F. Kennedy"
    },
    {
        "author": "Joan of Arc"
    }, 
    {
        "author": "Eleanor Roosevelt"
    },
    {
        "author": "Oprah"
    },
    {
        "author": "Marie Curie"
    },
    {
        "author": "Kim Kardashian"
    },
    {
        "author": "George R.R. Martin"
    },
    {
        "author": "Helen Keller"
    },
    {
        "author": "Francis Bacon"
    },
    {
        "author": "Karl Marx"
    },
    {
        "author": "Mary Poppins"
    },
    {
        "author": "Regina George"
    },
    {
        "author": "Spider-Man"
    }
];

