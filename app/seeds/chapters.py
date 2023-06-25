from app.models import db, Chapter, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_chapters():
    chapter1 = Chapter(
        title='The Awakening',
        body="""
        <pre><p>     The night was draped in a celestial cloak, as the full moon ascended to its zenith, casting an ethereal glow upon the land. In the heart of the ancient forest, a soft breeze rustled through the leaves, carrying whispers of forgotten enchantments. It was in this sacred place that a young woman, Seraphina, found herself drawn on this fateful night.</p>
        <p>     As she ventured deeper into the woods, an otherworldly luminescence danced through the canopy, guiding her path. Seraphina's heart fluttered with a mix of trepidation and anticipation, for she was on a quest to unlock the secrets of the Eternal Moonfire. Legends spoke of its transformative power, capable of granting unimaginable abilities to those who could harness its energy.</p>
        <p>     The forest grew denser, its ancient trees towering like sentinels guarding mystical knowledge. Seraphina's steps faltered momentarily as a sense of awe washed over her. She could feel the pulsating energy of the moonfire growing stronger, resonating within her very core. It was as if the forest itself whispered her name, inviting her to partake in its enchantment.</p>
        <p>     With renewed determination, Seraphina pressed on, her senses heightened, attuned to the subtlest of sounds and vibrations. Ancient symbols carved into the bark of trees marked her path, an arcane map guiding her towards her destiny. The air grew heavy with anticipation, each breath pregnant with possibility. Seraphina's heart raced, echoing the rhythm of the mystical realm she now traversed.</p>
        <p>     And so, under the watchful gaze of the eternal moon, Seraphina continued her solitary journey, her destiny intertwined with the luminous powers that awaited her. Little did she know that her every step drew her closer to a world of wonders, challenges, and a love that would transcend the boundaries of time itself. The stage was set, and Seraphina was about to embark on an extraordinary odyssey where the eternal moonfire would shape her destiny in ways she could never have imagined.</p></pre>
        """,
        story_id=1,
        published=True
    )
    chapter2 = Chapter(
        body="",
        story_id=1,
        published=True,
        cost=2
    )
    chapter3 = Chapter(
        title="Chapter 1",
        body="""
        <pre><p>     Amidst the bustling streets of the vibrant city, where dreams intertwined with reality, a serendipitous meeting was about to unfold. The sun painted the sky in hues of gold as pedestrians hurriedly passed each other, lost in their own worlds.</p>
        <p>     In the midst of this bustling chaos, two strangers' paths converged. Emily, a free-spirited artist with a heart full of passion, found herself immersed in the rhythmic pulse of the city. She gracefully moved through the crowd, her hazel eyes scanning the surroundings for inspiration.</p>
        <p>     On the other side of the street, James, a kind-hearted musician with an unwavering determination, strummed his guitar, pouring his soul into the melodies that echoed through the air. His eyes, the color of a stormy sea, held a glimmer of hope and a touch of melancholy.</p>
        <p>     Fate intervened as their eyes met across the busy intersection. Time seemed to slow down, the chaotic symphony of the city fading into the background. In that suspended moment, their souls recognized each other, as if they had known one another in a lifetime before.</p>
        <p>     With an uncontrollable force drawing them closer, Emily and James navigated through the labyrinth of people, their hearts beating in synchrony. The universe conspired to bring them together, intertwining their paths in the most extraordinary way.</p>
        <p>     Finally, they stood face to face, their eyes mirroring a mixture of curiosity and anticipation. Words failed them in that fleeting moment, but their hearts spoke a language only they could understand.</p>
        <p>     A smile, gentle and sincere, curved on Emily's lips, and James couldn't help but reciprocate. In that simple exchange, a connection was formed, an invisible bond woven between two souls destined to embark on a remarkable journey.</p>
        <p>     As the city continued its symphony, Emily and James found solace in each other's presence. It was as if the noise of the world faded away, leaving only the harmonious melody of their souls resonating in unison.</p>
        <p>     Little did they know that their chance encounter was just the beginning. Love had cast its spell, and their lives would forever be entwined. With each passing day, they would learn that love prevails, transcending time and conquering all obstacles.</p>
        <p>     Unbeknownst to Emily and James, their hearts had found their missing piece. Their story had begun, and with it, a tale of love's enduring power was set in motion, ready to unfold chapter by chapter, filling their lives with joy, passion, and the unwavering belief that love truly prevails.</p>
        <p>     And so, their journey commenced, guided by the invisible threads of destiny. Little did they know that their encounter was just the first step toward a love story that would leave an indelible mark on their souls and inspire all who witnessed it.</p>
        <p>     Chapter 1 marked the beginning, but there were countless pages waiting to be written, filled with moments of laughter, tears, growth, and the unwavering strength of love. Emily and James were about to embark on an adventure that would test their love and transform their lives in ways they could never have imagined.</p>
        <p>     Together, they would discover the extraordinary power that lies within the depths of their hearts and how, against all odds, love prevails.</p></pre>
        """,
        story_id=2,
        published=True
    )
    chapters = [
        Chapter (
            title="Chapter 2",
            body="""
            <pre><p>     In the days that followed their fateful encounter, Emily and James found themselves unable to shake the memory of that magical moment. Their thoughts continuously wandered back to the connection they had shared amidst the chaos of the city.</p>
            <p>     Emily, the artist with a soul that craved self-expression, felt an overwhelming urge to capture the essence of that encounter on her canvas. She gathered her paints, brushes, and a blank canvas, ready to recreate the emotions that had danced within her heart.</p>
            <p>     Meanwhile, James, the musician with melodies coursing through his veins, sat down with his guitar, his fingers tracing the strings as he tried to compose a symphony that would reflect the enchantment he had felt when he locked eyes with Emily.</p>
            <p>     Days turned into nights, and nights into days, as they dedicated themselves to their respective crafts. Emily painted with fiery strokes, infusing her artwork with passion and longing. The canvas became a mirror, reflecting the depth of her emotions, and yet, she felt a void—a missing piece waiting to be filled.</p>
            <p>     James strummed his guitar with a tenderness that echoed his gentle heart. He poured his soul into each chord, searching for the melody that would capture the essence of that profound connection. But no matter how he played, he couldn't recreate the magic they had shared.</p>
            <p>     Unbeknownst to both, their artistic endeavors were slowly leading them back to each other. The universe, in its infinite wisdom, had intertwined their paths once again.</p>
            <p>     One evening, Emily decided to showcase her artwork at a local gallery—a collection of her most heartfelt creations. She hoped that by sharing her art with the world, she could somehow find the missing piece of her artistic puzzle.</p>
            <p>     As fate would have it, James stumbled upon the gallery while searching for inspiration. Drawn by an invisible force, he walked through the doors, his eyes instantly captivated by the vibrant colors and raw emotions that adorned the walls.</p>
            <p>     And there, amidst the sea of paintings, James found himself standing before Emily's masterpiece—the very depiction of their fateful encounter. In that moment, he knew that the missing piece of his melody was intricately intertwined with her art.</p>
            <p>     Their eyes met across the gallery, recognition and joy illuminating their faces. It was as if the whispers of their hearts had finally been heard, and they both understood that they were destined to create something extraordinary together.</p>
            <p>     With hesitant steps, James approached Emily, his heart pounding with anticipation. The words spilled out effortlessly this time, as if they were merely continuing a conversation that had been paused.</p>
            <p>     "I've been searching for the melody that matches the beauty of your art," James confessed, his voice filled with sincerity.</p>
            <p>     "And I've been longing to find the colors that can capture the depths of your music," Emily replied, her eyes gleaming with excitement.</p>
            <p>     In that moment, a profound understanding washed over them. Their individual talents had merged into a harmonious collaboration, one that transcended art forms and spoke directly to their souls.</p>
            <p>     And so, Emily and James embarked on a new chapter, a chapter filled with the exploration of their creative synergy. Together, they would create a masterpiece—a symphony of art and music that would tell the story of their love and echo through the hearts of those who experienced it.</p>
            <p>     As they delved deeper into their creative partnership, they discovered that their love and shared passion had the power to touch lives, to inspire others to pursue their dreams fearlessly, and to believe that love could indeed prevail over any obstacle.</p>
            <p>     Chapter 2 was marked by the reconnection of two souls, bound by the whispers of their hearts and their shared devotion to their art. With their artistic talents intertwined, Emily and James were poised to create something extraordinary—an artistic expression that would forever leave an indelible mark on the</p></pre>
            """,
            story_id=2,
            published=True,
            cost=2
        ),

        Chapter(
        title="The Waning Light",
        body="""<pre><p>     In the not-so-distant future, humanity found itself facing a world on the brink <p>of collapse. The air had grown heavy with pollution, the climate had become erratic, and resources were dwindling. Amidst this chaos, a new threat emerged—rabbits. Yes, rabbits, but not the cuddly companions we once knew.</p>
        <p>     These were no ordinary rabbits. Mutated by the toxic environment, they had grown larger, more aggressive, and possessed an insatiable hunger. Their numbers multiplied rapidly, overwhelming cities and devouring crops, leaving devastation in their wake. These were the rabbits of the apocalypse, and they threatened to plunge the world into further turmoil.</p>
        <p>     In the midst of this crisis, a small group of survivors banded together, seeking refuge from the relentless onslaught of the rabbits. They called themselves "The Warren," a nod to both the underground burrows they sought for protection and the notion of unity they desperately clung to.</p>
        <p>     Evelyn, a resourceful young woman with a fierce determination, emerged as the de facto leader of The Warren. She had witnessed the devastation firsthand, her once-thriving hometown reduced to ruins by the relentless rabbit horde. With her unwavering spirit and strategic mind, she rallied the survivors, urging them to fight back against the encroaching chaos.</p>
        <p>     Among the group was Marcus, a seasoned hunter with a heart scarred by loss. He had experienced the horrors that the rabbits unleashed, losing his family to their relentless hunger. Marcus had honed his survival skills over time, adapting to this new world of darkness and despair.</p>
        <p>     Together, Evelyn and Marcus led The Warren through a barren landscape, constantly on the move in search of a haven untouched by the rabbit infestation. They faced countless trials along the way—scant resources, treacherous terrain, and the ever-present threat of ambush by the ravenous rabbits.</p>
        <p>     But amidst the desolation, glimmers of hope flickered in the hearts of The Warren. They stumbled upon forgotten caches of supplies, discovered hidden tunnels that provided temporary shelter, and encountered other survivors seeking refuge from the chaos. Each small victory served as a reminder that they were not alone in their fight.</p>
        <p>     As The Warren pressed on, rumors of a mythical safe haven began to circulate. Whispers spoke of an isolated valley untouched by the destruction, where nature still thrived, and the rabbits dared not tread. It became their shared goal—a sanctuary that held the promise of salvation and the chance to rebuild a shattered world.</p>
        <p>     With renewed determination, Evelyn and Marcus led their band of survivors toward this elusive sanctuary, the hope of a brighter future fueling their weary souls. They knew that reaching the valley would require unparalleled bravery and sacrifice, but they refused to succumb to the darkness that threatened to consume them.</p>
        <p      >As the sun sank below the horizon, casting an eerie glow over the desolate landscape, The Warren trudged forward, their spirits unyielding. They were the last flicker of light in a world on the precipice of despair, and they vowed to defy the odds, for their survival depended on it.</p></pre>""",
        story_id=3,
        published=True
        ),
        Chapter(
        title="The Call of Steel",
        body="""<pre><p>     The city of Adua stood as a bastion of power and intrigue, its spires piercing the heavens like the sharpened points of a thousand swords. Within its walls, secrets whispered through dimly lit corridors, and the scent of ambition hung heavy in the air. It was a place where alliances were forged and broken, and where treachery lurked at every turn.</p>
        <p>     In the heart of Adua, the Union's Inquisition held sway, their iron grip extending to the farthest reaches of the realm. Glokta, a former swordsman turned torturer, was one of their most feared and respected interrogators. Scarred and bitter, he wore his pain like armor, his twisted leg a constant reminder of the price he paid for loyalty.</p>
        <p>     Glokta's cynical worldview was about to collide with the ambitions of powerful men and women. In the wake of a brewing war, whispers of conspiracy had reached the ears of the Inquisition. The names of traitors were whispered in the shadows, and the city teetered on the edge of chaos.</p>
        <p>     Meanwhile, Logen Ninefingers, a notorious warrior from the North, found himself south of the sprawling wilderness he called home. With a reputation as deadly as his dual axes, Logen was haunted by a dark past and driven by a simple desire—to survive. He was a man of few words, his silence as intimidating as the steel he wielded.</p>
        <p>     Logen's path soon crossed with that of Bayaz, the First of the Magi, a figure of immense power and wisdom. Bayaz believed that Logen held a key to the impending conflict—a weapon that could tip the scales in the Union's favor. Reluctantly, Logen agreed to accompany Bayaz on a perilous journey, seeking answers and perhaps redemption along the way.</p>
        <p>     In a world where politics and war danced a deadly dance, Jezal dan Luthar, a young and arrogant Union officer, sought glory on the battlefield. Driven by a hunger for recognition and the adoration of the masses, he dreamed of becoming a hero, blissfully unaware of the harsh realities of combat.</p>
        <p>     As the machinations of power and fate intertwined, the lives of Glokta, Logen, and Jezal would become entangled in a web of treachery, bloodshed, and self-discovery. Each would be forced to confront their own demons and make choices that would shape the fate of the Union and themselves.</p></pre>""",
        story_id=4,
        published=True
        ),
        Chapter(
        title="Chapter 1",
        body="""<pre><p>     The Union's struggles had not abated since the events chronicled in "The Blade Itself." As war loomed on the horizon, the world seemed poised on the edge of chaos. In "Before They Are Hanged," the second installment of the series, Abercrombie thrusts readers back into a realm of turmoil and uncertainty.</p>
        <p>     In the desolate North, Logen Ninefingers, still haunted by his past and burdened by the weight of his actions, found himself leading a band of misfits known as the Named Men. Together, they sought to defend their land against the encroaching forces of the Union. With each passing day, the Northmen's hope dwindled, their resolve tested by the relentless advance of the enemy.</p>
        <p>     Meanwhile, in the heart of Adua, Glokta, the crippled Inquisitor, navigated the treacherous waters of politics and espionage. With war on the horizon, his skills as a torturer and master manipulator were in high demand. But amidst the power struggles and deceit, Glokta found himself drawn into a deadly game of secrets and betrayal, where even the most trusted allies could turn into adversaries.</p>
        <p>     Jezal dan Luthar, once a brash and arrogant officer, had been thrust into a position of leadership he never sought. As war threatened to consume the Union, he was tasked with a seemingly impossible mission—to defend the crumbling fortress of Dagoska against the Gurkish invaders. Jezal's dreams of glory collided with the harsh realities of war, forcing him to confront his own limitations and question the true nature of heroism.</p>
        <p>     As these disparate storylines unfolded, a sense of foreboding hung heavy in the air. The world trembled on the precipice of cataclysmic change, and the characters were but pawns in a game played by forces greater than themselves. In "Before They Are Hanged," Abercrombie masterfully set the stage for a grand and brutal narrative, exploring themes of sacrifice, redemption, and the relentless pursuit of power.</p>
        <p>     With each page turned, readers were drawn deeper into a world plagued by violence and uncertainty. The characters faced their own demons, tested their loyalties, and grappled with the true nature of humanity. As war clouds gathered and destinies intertwined, the stage was set for an epic confrontation that would push these characters to their limits and force them to confront the darkness within.</p></pre>""",
        story_id=5,
        published=True
        ),
        Chapter(
        title="Them",
        body="""<pre><p>     In the kingdom of Eldoria, nestled amidst rolling hills and verdant forests, a sense of tranquility prevailed. Life had been peaceful for generations, the land untouched by the terrors that plagued other realms. But within this idyllic setting, an ancient prophecy stirred, waiting to be fulfilled.</p>
        <p>     In a small village on the outskirts of Eldoria, a young woman named Amara lived a quiet existence. With fiery red hair and emerald green eyes, she possessed an air of mystery that captivated those who crossed her path. Amara's days were spent tending to her family's farm, but deep within her heart, she yearned for adventure and a life beyond the boundaries of her village.</p>
        <p>     One fateful morning, as the sun painted the sky with hues of gold and pink, a distant rumble echoed through the air. The ground trembled beneath Amara's feet, and a gust of wind carried with it an otherworldly fragrance—a mix of ancient magic and untamed power. Something had awoken, something that would change the course of her life forever.</p>
        <p>     Driven by curiosity and an unexplainable pull, Amara ventured into the nearby Forbidden Forest, a place shrouded in legend and whispered tales of danger. As she weaved through the towering trees, a sense of trepidation gripped her, but an unyielding determination pushed her forward.</p>
        <p>     The forest unveiled its secrets as Amara ventured deeper into its heart. She stumbled upon a hidden glade, bathed in dappled sunlight. In the center stood a stone pedestal, adorned with intricate carvings and pulsating with an ethereal glow. Perched atop the pedestal was an ancient tome, bound in weathered leather and sealed with a lock.</p>
        <p>     With trembling hands, Amara reached for the book, feeling an electric surge of energy coursing through her veins as her fingertips made contact. The lock dissolved, and the pages sprung open, revealing words written in a language unknown to her.</p>
        <p>     As she read the cryptic passages, a voice whispered in her mind—a voice that seemed to carry the weight of centuries. It spoke of dragons, long thought to be creatures of myth, and their imminent return to Eldoria. Amara, it seemed, was destined to play a pivotal role in their awakening.</p>
        <p>     Overwhelmed by the enormity of her discovery, Amara clutched the tome to her chest. The world around her seemed to shift, as if aligning itself with a newfound purpose. She knew that her life would never be the same, that her journey was just beginning.</p>
        <p>     With the weight of destiny on her shoulders and a dragon's breath stirring within her, Amara set forth from the glade, ready to face the challenges and dangers that awaited her. She would unravel the secrets of her own lineage, forge unexpected alliances, and confront the darkness that threatened to consume Eldoria.</p></pre>""",
        story_id=6,
        published=True
        ),
        Chapter(
        title="The Prophecy Unveiled",
        body="""<pre><p>     In the sprawling kingdom of Avaloria, a realm where magic and power entwined, whispers of an ancient prophecy began to circulate among its people. Legends spoke of a chosen one, a savior who would rise from obscurity to bring balance to a land ravaged by conflict.</p>
        <p>     In the heart of the capital city, amidst towering spires and bustling streets, a young woman named Lyra found herself drawn to the city's grand library. With her emerald eyes alight with curiosity, she had spent countless hours poring over tomes and scrolls, seeking knowledge and solace within their pages.</p>
        <p>     On this particular day, as Lyra roamed the aisles of ancient texts, a weathered book caught her attention. Its spine bore the title "The Prophecies of Eldor," and a shiver ran down her spine. Instinctively, she knew this was no ordinary book. It held the secrets of the kingdom's destiny.</p>
        <p>     Lyra carefully opened the book, its pages crackling with age, and her eyes widened at the words that greeted her. The prophecy foretold of a time when Avaloria would be on the brink of destruction, torn asunder by ruthless rulers and dark forces. But amidst the chaos, a single individual would emerge, wielding powers beyond imagination.</p>
        <p>     As she delved deeper into the prophecy, Lyra's heart quickened. The words spoke of a young woman with fiery red hair and a mark upon her wrist—a mark that matched Lyra's own. She was the chosen one, the harbinger of change who would unite the warring factions and restore harmony to Avaloria.</p>
        <p>     A mix of fear and determination coursed through Lyra's veins. She had always felt a deep connection to the realm, a yearning for something greater. Now, with the weight of destiny upon her shoulders, she knew she could not turn away from her fate.</p>
        <p>     Leaving the library, Lyra emerged into the sun-drenched streets of the capital. The bustling city seemed oblivious to the impending storm, its inhabitants going about their daily lives. But Lyra knew that behind the façade of normalcy, darkness lurked, threatening to engulf them all.</p>
        <p>     With a newfound resolve, Lyra set forth on her quest. She would seek out the wise elders, uncover ancient artifacts, and gather allies who shared her vision of a united Avaloria. Her path would be treacherous, filled with danger and uncertainty, but she would not falter.</p>
        <p>     As Lyra took her first steps towards her destiny, she couldn't help but wonder what lay ahead. The prophecy had foretold not only a great responsibility but also the chance for love, sacrifice, and the forging of her own identity. She would face formidable foes and test the limits of her own strength, all in the name of a kingdom on the brink of destruction.</p></pre>""",
        story_id=7,
        published=True
        ),
        Chapter(
        title="Red",
        body="""<pre><p>     The narrow streets of the Convent of Sweet Mercy were shrouded in darkness, the moon struggling to cast its feeble light through the thick canopy of clouds. Within the towering walls, a young girl named Nona huddled in the shadows, her heart pounding with a mix of anticipation and fear. She was alone, abandoned by her family and left to the mercy of the Convent's silent sisters.</p>
        <p>     Nona was just nine years old, yet her eyes held a wisdom beyond her years. Her hair, as red as fire, fell in untamed waves around her pale face. She clutched her threadbare cloak tightly around her, trying to ward off the biting chill that seemed to seep into her bones.</p>
        <p>     She had heard tales of the Convent—stories whispered by the villagers in hushed tones. They spoke of the nuns who dwelled within its walls, the Sisters of the Ancestor, women with mystical powers and deadly skills. They were warriors and assassins, bound by a code that was as strict as it was unforgiving.</p>
        <p>     Nona's heart quickened as she heard the soft, rhythmic footsteps approaching. The door creaked open, and a tall figure emerged from the darkness. It was Sister Apple, one of the senior sisters known for her sharp tongue and stern demeanor.
        <p>     "Come, child," Sister Apple said in a voice that brooked no argument. "The time has come for your training to begin."
        <p>     Nona followed the sister through the dimly lit corridors, the flickering torches casting eerie shadows on the stone walls. The air was heavy with the scent of incense and age, the weight of centuries of devotion hanging in every breath.</p>
        <p>     They entered a small chamber, its walls adorned with tapestries depicting scenes of battles and triumphs. In the center stood a circular dais, a mosaic of intricate patterns etched into the stone. Sister Apple motioned for Nona to step onto the dais.</p>
        <p>     "Kneel, child," she commanded, her voice echoing through the chamber.</p>
        <p>     Nona knelt, her heart pounding with a mixture of apprehension and excitement. She knew that her life was about to change forever. Sister Apple raised her hands, her fingers moving in intricate patterns as she whispered ancient words of power.</p>
        <p>     A surge of energy coursed through Nona's body, and she felt a connection to something greater than herself. The very essence of the Ancestor seemed to flow through her veins. It was a sensation unlike anything she had ever experienced before.</p>
        <p>     As the ritual reached its climax, Nona's surroundings blurred. The chamber faded away, replaced by a vivid dreamscape. She stood in a vast courtyard, the moon hanging low in the sky, casting an ethereal glow on everything it touched.</p>
        <p>     Before her stood a figure cloaked in shadow, its eyes gleaming with a feral intensity. It was the voice of the Ancestor, a presence that commanded both awe and reverence.</p>
        <p>     "You have been chosen, child," the voice whispered, its words resonating in Nona's soul. "Embrace your destiny, for you are the one who will shape the future."</p>
        <p>     With those words, the vision dissolved, and Nona found herself back in the chamber, her body trembling with a newfound purpose. She rose from her knees, her gaze fixed on Sister Apple, determination burning in her eyes.</p>
        <p>     "I am ready," Nona declared, her voice steady and resolute. "I will become a Sister of the Ancestor.</p>"
        <p>     Sister Apple nodded, a hint of approval in her gaze. "Then let your training begin, young Nona," she said. "May the Ancestor guide your steps and grant you strength.</p>"
        <p>     And so, Nona's journey into the world of the Silent Sisters began, a path fraught with challenges, secrets, and the relentless pursuit of mastery. Little did she know that her destiny would intertwine with the fate of nations, and that her flame, burning bright within her, would shape the course of history itself.</p></pre>""",
        story_id=8,
        published=True
        ),
        Chapter(
        title="The Empire's Reach",
        body="""<pre><p>     The Empire of Masks loomed large, its influence stretching across vast continents and commanding the unwavering loyalty of its subjects. Amidst this sprawling dominion, on a small island washed by the restless sea, a young girl named Baru Cormorant stood on the precipice of her destiny.</p>
        <p>     The island of Taranoke was her home, a place of rugged beauty where the crashing waves and sweeping winds echoed the resilience of its people. Baru, with her sharp intellect and unwavering determination, harbored ambitions that exceeded the boundaries of her island home. She yearned for power, not for its own sake, but as a means to subvert the empire that had swallowed her homeland.</p>
        <p>     From a young age, Baru had understood the ruthless efficiency of the Empire. Its control was not only enforced by armies and navies but also by the economic chains that bound nations. Taxes, tariffs, and a complex network of trade were the threads by which the empire ensnared its vassals.</p>
        <p>     Baru's intellect soared, devouring knowledge as if it were sustenance. She excelled in the island's meager schools, demonstrating a prodigious talent for mathematics and strategy. The elders recognized her potential, and whispers of her future spread through the community.</p>
        <p>     But as Baru grew older, her path diverged from the expectations of her people. She saw the empire's reach extend further, consuming neighboring lands and extinguishing their cultures. The islanders were docile, submitting to the empire's rule and trading their autonomy for a semblance of stability. But Baru refused to accept this fate. She despised the empire for its subjugation, and a fire burned within her to dismantle it from within.</p>
        <p>     Opportunity came knocking in the form of an imperial messenger, a stoic figure who arrived with news of Baru's acceptance into the imperial academy. The offer was a double-edged sword, for it would require her to abandon her island, her family, and everything she held dear. Yet, it presented a chance to infiltrate the very heart of the empire and discover its weaknesses.</p>
        <p>     Baru made her choice. With her heart heavy but her resolve unwavering, she bid farewell to Taranoke and embarked on a treacherous journey to Aurdwynn, the imperial capital. The imperial academy awaited her, a bastion of knowledge and indoctrination where she would be groomed to serve the Empire.</p>
        <p>     As the ship sailed towards the distant shores, Baru's mind buzzed with questions and plans. She was acutely aware that her path was fraught with danger and deceit. She would need to navigate a world of intrigue, diplomacy, and betrayal. Trust would become a luxury she couldn't afford.</p>
        <p>     The voyage marked the beginning of a new chapter in Baru's life, one in which she would conceal her true intentions, feign loyalty, and rise through the ranks of imperial bureaucracy. She would learn the empire's systems, exploit its weaknesses, and eventually bring about its downfall.</p>
        <p>     In the depths of her heart, Baru Cormorant swore an oath—to become the Empire's most cunning and dangerous traitor, a force that would shake its very foundations. Her journey had begun, and the world would come to know her name.</p></pre>""",
        story_id=9,
        published=True
        ),
        Chapter(
        title=" Bounty Hunter",
        body="""<pre><p>     The air was heavy with radioactive dust, the remnants of a world devastated by war. In the year 2021, after the catastrophic events known as World War Terminus, the Earth had become a desolate wasteland. Most of humanity had fled to colonies on other planets, leaving behind a crumbling civilization.</p>
        <p>     Rick Deckard, a bounty hunter for the San Francisco Police Department, stood on the roof of his apartment building, gazing at the ruined landscape below. He adjusted the collar of his trench coat, shielding himself from the toxic atmosphere, and lit a cigarette with a flick of his wrist. Deckard was a tired man, worn down by the daily grind of his job and the weight of a decaying world.</p>
        <p>     His assignment that day was to retire a group of rogue androids, the Nexus-6 models, who had escaped from the off-world colonies and infiltrated Earth. These androids were highly advanced, nearly indistinguishable from humans, making them dangerous and elusive targets. The task of hunting them down fell to bounty hunters like Deckard, skilled individuals who possessed the ability to detect artificial beings.</p>
        <p>     Deckard's first stop was the Tyrell Corporation headquarters, the creators of the androids. He entered the vast building, its interior a stark contrast to the desolation outside. The company's motto, "More Human Than Human," was emblazoned on the walls, a testament to their technological prowess.</p>
        <p>     He met with Eldon Rosen, the head of the corporation, who provided him with detailed information about the escaped androids. As Deckard listened, he couldn't help but feel a sense of unease. These androids were becoming increasingly sophisticated, blurring the line between human and machine. The distinction that once seemed clear was now fading away.</p>
        <p>     Armed with a list of the escaped androids and a device known as the Voigt-Kampff test, which measured emotional responses to identify androids, Deckard set out on his mission. He visited a series of seedy bars and shadowy establishments, following leads and searching for clues. Along the way, he encountered a host of strange and desperate characters, remnants of a fractured society.</p>
        <p>     Deckard's journey into the underbelly of the city revealed the darker aspects of humanity. He witnessed the decay of empathy and compassion, as people turned to artificial animals to fill the void left by their absence. Deckard himself longed for something more, something authentic and alive.</p>
        <p>     As night fell, Deckard found himself in the presence of an android named Luba Luft, a singer with a hauntingly beautiful voice. As he conducted the Voigt-Kampff test, he detected no emotional responses, confirming her status as an android. The realization brought him no satisfaction, only a lingering sense of melancholy.</p></pre>
        """,
        story_id=10,
        published=True
        ),
        Chapter(
        title="Shadows Of The Past",
        body="""
        <pre><p>    The wind howled through the desolate streets of Beryl, a city abandoned by hope and ravaged by war. In this grim and unforgiving world, the Black Company, a notorious group of mercenaries, found themselves in the heart of the chaos. Led by their enigmatic captain, Croaker, they navigated the treacherous landscape with hardened resolve.</p>
        <p>    As darkness settled over the city, Croaker and his company sought refuge in an abandoned tavern. The once lively establishment now stood as a hollow shell, a testament to the destruction that had befallen Beryl. The company's members huddled together, their faces etched with weariness and battle scars.</p>
        <p>    Croaker, a man of few words, brooded over a tattered map spread across a wooden table. His mind drifted back to the past, to the origins of the Black Company. They were an ancient and secretive group, renowned for their skill and their willingness to take on any job, no matter how dangerous or morally ambiguous.</p>
        <p>    The company's latest assignment was a contract with Lady, a powerful sorceress and ruler of the northern city of Beryl. Lady's grip on power was threatened by rebel factions and rival sorcerers, and she sought the Black Company's aid in maintaining her control. The promise of a generous payment and the reputation of the company made it an offer they couldn't refuse.</p>
        <p>    Croaker's thoughts were interrupted by the arrival of One-Eye and Goblin, two eccentric wizards and long-standing members of the Black Company. They entered the tavern, their presence preceded by an air of mischief and magic. One-Eye, with his mismatched eyes and a mischievous grin, was known for his unpredictable nature, while Goblin, small and wiry, possessed a keen intellect that belied his appearance.</p>
        <p>    Together, the trio discussed the imminent challenges they would face in Beryl. They spoke of the rival sorcerers and the bloody battles that awaited them. They knew that survival in this cutthroat world required more than just skill with a sword or command over magic—it demanded cunning, adaptability, and a willingness to get their hands dirty.</p>
        <p>     As they prepared to embark on their mission, Croaker couldn't shake the nagging feeling that they were entangled in something far more sinister than they had bargained for. The shadows cast by their pasts loomed large, threatening to consume them and plunge them into a darkness from which they might never emerge.</p></pre>""",
        story_id=11,
        published=True
        ),
        Chapter(
        title="Shadows of Guilt",
        body="""<pre><p>     In the small, isolated village of Ravensbrook, nestled among towering mountains and shrouded in an eerie mist, the sins of the people weighed heavily on their souls. It was a place where darkness thrived, and the villagers believed in the power of redemption through a mysterious figure known as the Sin Eater.</p>
        <p>     At the heart of Ravensbrook stood a modest cottage, surrounded by overgrown vines and gnarled trees. It was here that the Sin Eater resided, a figure cloaked in secrecy and laden with the burdens of others. The villagers regarded the Sin Eater with both fear and reverence, for they believed that this enigmatic individual possessed the ability to absolve them of their sins, allowing them passage into the afterlife.</p>
        <p>     The Sin Eater's true name was lost to time, known only as a whispered legend passed down from generation to generation. The current Sin Eater, a young woman named Evelyn, had been chosen by an ancient ritual to bear the weight of others' transgressions. With her raven-black hair and eyes as deep as the night sky, she bore the mark of her calling—an intricate sigil etched into her palm, forever linking her to the sins of the village.</p>
        <p>     On a somber evening, as the sun dipped below the horizon, Evelyn found herself standing at the threshold of her cottage. The weight of the village's sins pressed upon her weary shoulders, her own heart burdened by the knowledge of the darkness that plagued Ravensbrook. She felt the villagers' gaze upon her, their hopes and fears intertwined, as they sought solace in her ability to cleanse their souls.</p>
        <p>     Inside the cottage, a flickering candle illuminated a simple wooden table adorned with a meager meal. It had been weeks since Evelyn last partook in the joys of a guilt-free meal, her own sustenance intertwined with the consumption of others' sins. As she sat down, her mind filled with the memories of the villagers—acts of betrayal, greed, and forbidden desires. Their secrets whispered to her, begging for release.</p>
        <p>     Evelyn's hands trembled as she reached for a crust of bread, her thoughts consumed by the weight of her responsibility. She contemplated the nature of sin and absolution, wondering if the line between right and wrong was as clear as it seemed. In this world of shadows and moral ambiguity, she questioned whether she was truly a harbinger of redemption or merely a pawn in a game she did not fully comprehend.</p>
        <p>     As the night grew darker, a knock echoed through the cottage, pulling Evelyn from her introspection. She rose, her footsteps heavy, and opened the door to find a young woman standing before her—a face filled with desperation and anguish. It was Isabella, a villager haunted by a secret too burdensome to bear alone.</p>
        <p>     Isabella's voice quivered as she spoke of a forbidden love, a transgression that threatened to tear apart the delicate fabric of Ravensbrook's society. She begged Evelyn for absolution, her tear-streaked face a reflection of the village's collective guilt.</p>
        <p>     With a heavy heart, Evelyn invited Isabella inside, knowing that by sharing in her pain, she would be forever bound to the consequences of her actions. In that moment, she understood that the role of the Sin Eater was not merely to absolve sins but to confront the intricacies of human nature, the gray areas that lay between right and wrong.</p></pre>""",
        story_id=12,
        published=True
        ),
    ]

    db.session.add(chapter1)
    db.session.add(chapter2)
    db.session.add(chapter3)
    [db.session.add(chapter) for chapter in chapters]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_chapters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.chapters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM chapters"))

    db.session.commit()
