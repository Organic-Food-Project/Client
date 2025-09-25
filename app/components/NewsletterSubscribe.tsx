import Facebook from '@/assets/icons/Facebook.svg';
import Instagram from '@/assets/icons/Instagram.svg';
import Twitter from '@/assets/icons/Twitter.svg';
import Patreon from '@/assets/icons/Patreon.svg';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

export default function NewsletterSubscribe() {
  return (
    <section className="mainPadding py-10 gap-10 flex max-lg2:flex-wrap items-center justify-between bg-[#F7F7F7]">
      <div>
        <h2 className="text-body-xxl font-600">Subcribe our Newsletter</h2>
        <p className="text-body-small font-400 text-gray-400 pt-1 max-w-[500px]">
          Stay fresh with the latest organic deals and healthy tips! Subscribe
          to our newsletter for exclusive offers, new arrivals, and wellness
          inspiration.
        </p>
      </div>
      <form className="xs3:rounded-full bg-white flex max-xs3:flex-col flex-grow xs3:max-h-[50px]">
        <label
          htmlFor="newsletter_email"
          id="newsletter-heading"
          className="sr-only"
        >
          Subscribe to our Newsletter
        </label>
        <input
          type="email"
          id="newsletter_email"
          name="email"
          required
          placeholder="Your email address"
          className="flex-grow max-xs3:py-5 pl-6 pr-10 max-xs3:text-xs xs3:rounded-full outline-none"
        />
        <Button
          aria-label="Subscribe"
          variant="default"
          className="rounded-[0px] xs3:rounded-full px-5 py-3 xs3:px-10 xs3:py-4 outline-none xs3:-ml-5"
        >
          Subscribe
        </Button>
      </form>
      <div className="flex gap-4 flex-grow sm2:flex-grow-0 justify-center">
        <Link href="https://web.facebook.com/" target="_blank">
          <Image
            src={Facebook}
            alt="Facebook"
            width={26}
            height={26}
            className="rounded-full bg-primary p-1 min-w-[26px] aspect-square"
          />
        </Link>
        <Link href="https://twitter.com/" target="_blank">
          <Image
            src={Twitter}
            alt="Twitter"
            width={26}
            height={26}
            className="min-w-[26px] aspect-square"
          />
        </Link>
        <Link href="https://www.patreon.com/" target="_blank">
          <Image
            src={Patreon}
            alt="Patreon"
            width={26}
            height={26}
            className="min-w-[26px] aspect-square"
          />
        </Link>
        <Link href="https://www.instagram.com/" target="_blank">
          <Image
            src={Instagram}
            alt="Instagram"
            width={26}
            height={26}
            className="min-w-[26px] aspect-square"
          />
        </Link>
      </div>
    </section>
  );
}
