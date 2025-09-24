import ProjectTable from "@/components/ui/table";

const HomePage = () => {
  const projects = [
    {
      name: "Spotify",
      logo: "https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-spotify.svg",
      budget: "$2,500",
      status: "working",
      completion: "60%",
    },
    {
      name: "Invision",
      logo: "https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-invision.svg",
      budget: "$5,000",
      status: "done",
      completion: "100%",
    },
    {
      name: "Jira",
      logo: "https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-jira.svg",
      budget: "$3,400",
      status: "canceled",
      completion: "30%",
    },
    {
      name: "Slack",
      logo: "https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-slack.svg",
      budget: "$1,000",
      status: "canceled",
      completion: "0%",
    },
    {
      name: "Webdev",
      logo: "https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-webdev.svg",
      budget: "$14,000",
      status: "working",
      completion: "80%",
    },
    {
      name: "Adobe XD",
      logo: "https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-xd.svg",
      budget: "$2,300",
      status: "done",
      completion: "100%",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Project Dashboard</h1>
      <ProjectTable projects={projects} />
    </div>
  );
};

export default HomePage;
