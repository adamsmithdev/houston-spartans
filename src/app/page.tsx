import { Hero } from '@/components/layout';
import {
	Mission,
	Community,
	Merch,
	Spartans,
} from '@/components/sections/home';
import { Partners } from '@/components/sections/partners';
import { News } from '@/components/sections/news';
import { Contact } from '@/components/forms';

export default function Home() {
	return (
		<>
			<Hero />
			<Mission />
			<Partners />
			<Community />
			<Merch />
			<Spartans />
			<News />
			<Contact />
		</>
	);
}
