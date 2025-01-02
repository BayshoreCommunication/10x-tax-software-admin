import UserSignin from "@/components/userAuth/UserSignin";

export const metadata = {
  title: "10x Tax Software",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi imperdiet, mauris vitae molestie gravida, libero lorem fermentum elit, eu placerat nunc elit id massa. Morbi interdum lectus ut mauris vehicula",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-USA",
    },
  },
  openGraph: {
    images: "/opengraph-image.jpg",
  },
};

const page = () => {
  return (
    <div>
      <UserSignin />
    </div>
  );
};

export default page;
