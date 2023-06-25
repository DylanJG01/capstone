from app.models import db, Story, Tag, Category, environment, SCHEMA
from sqlalchemy.sql import text
from random import randrange

def seed_stories():
    story1 = Story(
        user_id = 1,
        cover = 'https://images.nightcafe.studio/jobs/6ZVRt2DedxJglvsdlb3w/6ZVRt2DedxJglvsdlb3w--1--tvx1j.jpg?tr=w-1600,c-at_max',
        title = 'Eternal Moonfire',
        published = True,
        category_name="Romance",
        description = '"Eternal Moonfire" is an enchanting tale of destiny and love set in a realm where the moon holds extraordinary power. Follow two souls as they embark on a perilous journey to unlock the secrets of the Moonfire, shaping the fate of their world. Faced with treacherous obstacles and inner demons, their bond deepens, offering hope amidst darkness. This captivating story explores the enduring power of love and sacrifice in a world balanced between light and darkness.'
    )
    story2 = Story(
        user_id = 1,
        cover = 'https://images.nightcafe.studio/jobs/vBjY18vA7qSeGi6OMNdn/vBjY18vA7qSeGi6OMNdn--2--6t3kt.jpg?tr=w-1600,c-at_max',
        title = "Love Prevails",
        published=True,
        category_name="Romance",
        description = '"Love Prevails" is a heartwarming romance book that celebrates the enduring power of love. Against all odds and through life`s trials, two souls find each other and embark on a profound journey of love, hope, and resilience. As they navigate challenges and obstacles, their bond grows stronger, defying the forces that seek to keep them apart. Set against a backdrop of emotional depth and heartfelt moments, "Love Prevails" is a captivating tale that reminds us of the extraordinary strength and triumph of love in the face of adversity.',
    )
    stories = [
        Story(
            user_id = 1,
            cover="https://m.media-amazon.com/images/I/41CKw0DiUJL.jpg",
            description='In the post-apocalyptic adventure "Rabbits of the Apocalypse," a group of intelligent and resourceful rabbits embark on a quest to uncover the mysteries of their ravaged world. Led by the cunning Hopper, they navigate dangers and unravel a deeper truth. With humor and heart, this imaginative tale showcases the unexpected heroes in a world on the brink of collapse.',
            title="Rabbits of the Apocalypse",
            published=True,
            category_name="Romance"
        ), #0
        Story(
            user_id = 1,
            cover="https://m.media-amazon.com/images/I/51xfs0AnKkL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
            title = 'The Blade Itself',
            description='"The Blade Itself" is a gripping fantasy novel where a diverse cast of characters, each with their own secrets, navigate a world rife with treachery and impending war. Betrayal and moral ambiguity blur the lines between heroes and villains in this gritty tale of power struggles and ancient prophecies. Brace yourself for a journey filled with intrigue, brutal combat, and the unpredictable twists of fate.',
            published=True,
            category_name="Fantasy"
        ), #1
        Story(
            user_id = 1,
            cover="https://m.media-amazon.com/images/I/51ZMTnBFNVL.jpg",
            description='"Before They Are Hanged" is a captivating fantasy book that delves into a world on the brink of destruction. In this gripping tale, a disparate group of unlikely heroes is forced to confront their deepest fears and darkest secrets as they embark on a perilous quest to save their realm from impending doom. With time running out and the weight of the world on their shoulders, they must navigate treacherous lands, battle ancient evils, and face their own inner demons. As the title suggests, the story explores the complex choices and sacrifices these characters must make before they face the ultimate test of their resolve. "Before They Are Hanged" is a thrilling and thought-provoking journey that examines the human spirit in the face of adversity and the transformative power of redemption.',
            title = "Before They Are Hanged",
            published=True,
            category_name="Fantasy",
        ), #2
        Story(
            user_id = 1,
            cover="https://images.nightcafe.studio/jobs/Ep03W4EW6Yp1fkgP6vh8/Ep03W4EW6Yp1fkgP6vh8--1--gpgbl.jpg?tr=w-1600,c-at_max",
            description='"Dragon`s Breath" is a fiery and passionate romance that takes flight amidst a world of mythical wonders. In a realm where dragons soar the skies and magic pulses in the air, two unlikely souls are drawn together by a powerful force. As their destinies intertwine, they embark on an unforgettable journey, kindling a love that blazes with intensity. Amidst breathtaking landscapes and exhilarating adventures, they must navigate dangerous secrets and ancient rivalries. Fueled by desire and emboldened by courage, their love proves to be the ultimate weapon against the encroaching darkness. "Dragon`s Breath" is a tale of love`s transformative power, where hearts unite in a realm where passion and enchantment collide.',
            title = "Dragon's Fury",
            published=True,
            category_name="Romance",
        ), #3
        Story(
            user_id = 1,
            cover="https://images.nightcafe.studio/jobs/Ep03W4EW6Yp1fkgP6vh8/Ep03W4EW6Yp1fkgP6vh8--3--a5453.jpg?tr=w-1600,c-at_max",
            description='"They Who Would Rule" is an enthralling fantasy book where ambition, power, and treachery intertwine as contenders vie for control of a magical realm. Journey through a world of political intrigue and unexpected alliances, where the pursuit of power comes at a profound cost.',
            title = "They Who Would Rule",
            published=True,
            category_name="Fantasy"
        ), #4
        Story(
            user_id = 2,
            cover="https://pictures.abebooks.com/isbn/9780008152321-us.jpg",
            description='"Red Sister" is a mesmerizing blend of fantasy and science fiction that takes readers on an exhilarating journey through a world where ancient traditions and futuristic technology converge. In this enthralling tale, a young girl named Nia discovers she possesses extraordinary abilities that set her apart from others. Drawn into a clandestine organization known as the Red Sisters, she undergoes rigorous training in the arts of combat, espionage, and manipulation. As Nia`s powers unfold, she unravels the dark secrets that lie at the heart of the organization and finds herself entangled in a web of political intrigue and interstellar conflicts. Faced with epic challenges and life-altering choices, Nia must navigate a treacherous path to uncover the truth about her own identity and the fate of her world. "Red Sister" is a thrilling and thought-provoking exploration of power, identity, and the resilience of the human spirit, set against a backdrop of dazzling technology and ancient mystical forces.',
            title = "Red Sister",
            published=True,
            category_name="Fantasy"
        ), #5
        Story(
            user_id = 2,
            cover="https://upload.wikimedia.org/wikipedia/en/0/0f/The_Traitor_Baru_Cormorant_%28first_edition_cover%29.jpg",
            description='"The Traitor Baru Cormorant" is a gripping and morally complex tale that unfolds in a world ruled by a powerful empire. Baru Cormorant, a talented and ambitious young woman, finds herself torn between her loyalty to her homeland and her desire to subvert the empire from within. As she rises through the ranks, driven by a thirst for vengeance and a desire to protect her people, Baru must navigate treacherous political alliances, heartbreaking sacrifices, and the constant struggle to maintain her true identity. With each move she makes, Baru becomes entangled in a web of secrets, manipulation, and betrayal. "The Traitor Baru Cormorant" is a compelling exploration of power, loyalty, and the lengths one person will go to challenge an oppressive system. It is a tale that will leave readers questioning the true nature of trust and the devastating consequences of choosing between love and duty.',
            title = 'The Traitor Baru Cormorant',
            published=True,
            category_name="Fantasy"

        ), #6
        Story(
            user_id = 2,
            cover="https://pictures.abebooks.com/isbn/9780553380958-us.jpg",
            description='"Snow Crash" is a mind-bending and exhilarating sci-fi adventure that catapults readers into a dystopian future. In a world where virtual reality has become a sprawling metaverse and governments have given way to corporate domination, a young hacker and pizza delivery driver named Hiro Protagonist becomes embroiled in a high-stakes conspiracy',
            title = "Snow Crash",
            published=True,
            category_name="Mystery"
        ), #7
        Story(
            user_id = 2,
            cover="https://upload.wikimedia.org/wikipedia/en/e/ee/DoAndroidsDream.png",
            description='"Do Androids Dream of Electric Sheep?" is a haunting and philosophical science fiction masterpiece that probes the depths of what it means to be human. Set in a post-apocalyptic world where androids are indistinguishable from humans, the story follows Rick Deckard, a bounty hunter tasked with "retiring" rogue androids. As Deckard navigates a decaying society plagued by mass extinction and artificial life, he grapples with his own existential crisis. Is empathy truly the measure of humanity? Can artificial beings possess genuine emotions? These profound questions drive Deckard to confront the blurred lines between reality and illusion, pushing him to the brink of his own sanity. Philip K. Dick`s visionary narrative explores themes of identity, empathy, and the nature of consciousness, challenging readers to ponder the essence of what makes us human in a world where the line between man and machine is increasingly blurred. Prepare to be captivated by this thought-provoking exploration of the human condition in the face of advancing technology.',
            title = "Do Androids Dream of Electric Sheep?",
            published=True,
            category_name="Mystery"
        ), #8
        Story(
            user_id = 2,
            cover="https://m.media-amazon.com/images/I/51f1jqTYNxL.jpg",

            description='"The Black Company" is a gritty and immersive dark fantasy tale that thrusts readers into a world ravaged by war and sorcery. Follow the eponymous mercenary group known as the Black Company, a band of hardened warriors with a reputation for taking on the deadliest of contracts. Led by the enigmatic Captain, their loyalty is tested as they navigate treacherous alliances, face supernatural adversaries, and confront their own inner demons. Set against a backdrop of political intrigue and ancient prophecies, the story delves into the moral complexities of war, where survival often comes at a high price. Through the eyes of a new recruit, readers witness the trials and camaraderie that bind the Black Company together, as they fight for their lives and seek to unravel the mysteries of a world plunged into darkness. "The Black Company" is a compelling exploration of the blurred lines between heroism and villainy, and the sacrifices made in the pursuit of power and survival.',
            title = "The Black Company",
            published=True,
            category_name="Mystery"
        ), #9
        Story(
            user_id = 2,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description='In the dark fantasy novel "Sin Eater," a young woman named Elara possesses the ability to consume the sins of the dead. As she uncovers corruption and conspiracy, Elara embarks on a perilous journey of self-discovery and redemption, challenging the oppressive forces that control her world. "Sin Eater" explores themes of guilt, forgiveness, and the power of one`s choices in a haunting and immersive tale.',
            title='Sin Eater',
            published=True,
            category_name="Mystery"
        ), #10
    ]

    db.session.add(story1)
    db.session.add(story2)
    [db.session.add(story) for story in stories]


    db.session.commit()

def undo_stories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stories"))

    db.session.commit()
