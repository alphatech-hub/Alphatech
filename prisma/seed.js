// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // ── Admin account ──────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Alphatech Admin";

  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.upsert({
      where: { email },
      update: { role: "ADMIN" },
      create: { name, email, passwordHash, role: "ADMIN" },
    });
    console.log(`✓ Admin account: ${email}`);
  }

  // ── Categories ─────────────────────────────────────────────────
  const cats = [
    { name: "Laptops", slug: "laptops" },
    { name: "Desktop Computers", slug: "desktops" },
    { name: "Computer Accessories", slug: "accessories" },
    { name: "Storage Devices", slug: "storage" },
    { name: "Networking", slug: "networking" },
    { name: "Components", slug: "components" },
    { name: "Gadgets", slug: "gadgets" },
  ];

  for (const cat of cats) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`✓ ${cats.length} categories seeded`);

  // ── Sample products ────────────────────────────────────────────
  const laptopCat = await prisma.category.findUnique({ where: { slug: "laptops" } });
  const deskCat = await prisma.category.findUnique({ where: { slug: "desktops" } });
  const accCat = await prisma.category.findUnique({ where: { slug: "accessories" } });
  const storageCat = await prisma.category.findUnique({ where: { slug: "storage" } });

  const products = [
    {
      categoryId: laptopCat.id,
      name: "Dell Latitude 7420",
      slug: "dell-latitude-7420",
      description: "Business-grade laptop, Intel Core i5, 8GB RAM, 256GB SSD. Professionally refurbished and tested.",
      price: 480000,
      compareAtPrice: 620000,
      condition: "REFURBISHED",
      brand: "Dell",
      sku: "DELL-LAT-7420",
      stockQuantity: 5,
      images: [],
      specs: { Processor: "Intel Core i5-1145G7", RAM: "8GB DDR4", Storage: "256GB NVMe SSD", Display: "14\" FHD IPS", OS: "Windows 11 Pro" },
      isFeatured: true,
    },
    {
      categoryId: laptopCat.id,
      name: "HP ProBook 450 G8",
      slug: "hp-probook-450-g8",
      description: "Reliable HP laptop perfect for students and professionals. Core i7, 16GB RAM, 512GB SSD.",
      price: 650000,
      compareAtPrice: null,
      condition: "NEW",
      brand: "HP",
      sku: "HP-PB-450G8",
      stockQuantity: 3,
      images: [],
      specs: { Processor: "Intel Core i7-1165G7", RAM: "16GB DDR4", Storage: "512GB NVMe SSD", Display: "15.6\" FHD", OS: "Windows 11 Home" },
      isFeatured: true,
    },
    {
      categoryId: deskCat.id,
      name: "Alphatech Ryzen 7 Custom Gaming PC",
      slug: "alphatech-ryzen-7-custom-gaming",
      description: "Custom-built gaming and workstation PC by our certified engineers. Ryzen 7, RTX 3060, 32GB RAM.",
      price: 1250000,
      compareAtPrice: null,
      condition: "CUSTOM",
      brand: "Alphatech",
      sku: "AT-CUSTOM-R7",
      stockQuantity: 2,
      images: [],
      specs: { CPU: "AMD Ryzen 7 5700X", GPU: "NVIDIA RTX 3060 12GB", RAM: "32GB DDR4 3200MHz", Storage: "1TB NVMe SSD", PSU: "650W 80+ Gold" },
      isFeatured: true,
    },
    {
      categoryId: accCat.id,
      name: "Logitech MX Master 3S Wireless Mouse",
      slug: "logitech-mx-master-3s",
      description: "Premium wireless mouse for professionals. Ultra-fast MagSpeed scrolling, ergonomic design.",
      price: 65000,
      compareAtPrice: 75000,
      condition: "NEW",
      brand: "Logitech",
      sku: "LOG-MX-3S",
      stockQuantity: 15,
      images: [],
      specs: { Connectivity: "Bluetooth / USB-C", DPI: "200–8000 DPI", Battery: "70-day battery life", Compatibility: "Windows, Mac, Linux" },
      isFeatured: false,
    },
    {
      categoryId: storageCat.id,
      name: "Samsung 1TB NVMe SSD (970 EVO Plus)",
      slug: "samsung-970-evo-plus-1tb",
      description: "High-performance NVMe SSD for fast boot times and data transfer. Ideal for upgrades.",
      price: 42000,
      compareAtPrice: 50000,
      condition: "NEW",
      brand: "Samsung",
      sku: "SAM-970EVO-1TB",
      stockQuantity: 20,
      images: [],
      specs: { Capacity: "1TB", Interface: "PCIe 3.0 NVMe M.2", ReadSpeed: "3,500 MB/s", WriteSpeed: "3,300 MB/s", Warranty: "5 years" },
      isFeatured: true,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  console.log(`✓ ${products.length} sample products seeded`);

  // ── Sample blog posts ──────────────────────────────────────────
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (admin) {
    const blogPosts = [
      {
        title: "5 Signs Your Laptop Battery Needs Replacement",
        slug: "5-signs-laptop-battery-needs-replacement",
        content: `## Is your laptop battery failing?\n\nA dying battery is one of the most common laptop problems we see at Alphatech. The good news is it's usually easy and affordable to fix — if you catch it early.\n\n## Warning signs to watch for\n\n- Your laptop dies suddenly even when showing 30-40% battery\n- The battery percentage jumps around unpredictably\n- Your laptop runs much hotter than usual\n- The laptop only works when plugged in\n- Windows shows a "Consider replacing your battery" warning\n- Your laptop takes much longer to charge than it used to\n\n## What causes battery failure?\n\nLaptop batteries are made of lithium-ion cells that degrade with each charge cycle. Most batteries are rated for 300-500 full cycles. After that, they lose capacity significantly.\n\nOther causes include heat damage (leaving your laptop in a hot car), overcharging, and deep discharge (letting it die completely repeatedly).\n\n## How to extend your battery life\n\n- Avoid charging to 100% every time — stop at 80-90% for daily use\n- Don't leave it plugged in constantly once fully charged\n- Keep your laptop cool and well-ventilated\n- Update your drivers and operating system regularly\n\n## When to bring it to us\n\nIf you're experiencing any of the signs above, bring your laptop to Alphatech. We'll test the battery health, give you an honest assessment, and replace it with a genuine battery if needed — usually within the same day.\n\nBattery replacement starts from ₦8,000 depending on your laptop model.`,
        tags: ["Laptops", "Battery", "Maintenance"],
        published: true,
      },
      {
        title: "How to Speed Up a Slow Windows Computer",
        slug: "how-to-speed-up-slow-windows-computer",
        content: `## Is your computer running slow?\n\nA slow computer is frustrating — but in most cases it's completely fixable without buying a new machine. Here are the most effective steps our engineers use.\n\n## Step 1: Restart it properly\n\nMany people leave their computers in sleep mode for days or weeks. A proper restart clears RAM and stops background processes from building up. Try restarting before anything else.\n\n## Step 2: Check what's using your resources\n\nPress Ctrl + Shift + Esc to open Task Manager. Click the CPU and Memory columns to sort by usage. If something unfamiliar is using a lot of resources, it could be malware.\n\n## Step 3: Remove startup programs\n\nMany apps add themselves to startup automatically. In Task Manager, click the Startup tab and disable anything you don't need starting with Windows.\n\n## Step 4: Run a malware scan\n\nMalware is one of the biggest causes of slow computers. Use Windows Defender (built-in) or bring your computer to us for a professional deep clean.\n\n## Step 5: Check your storage\n\nIf your hard drive or SSD is more than 90% full, Windows struggles to work properly. Delete files you don't need or move them to an external drive.\n\n## Step 6: Consider an upgrade\n\nIf your computer has an old hard drive (HDD), upgrading to an SSD is the single biggest performance improvement you can make. We see computers go from 3-minute startup times to under 20 seconds after an SSD upgrade.\n\nRAM upgrades are also very effective if you have less than 8GB.\n\n## When to bring it to Alphatech\n\nIf you've tried the above and your computer is still slow, bring it to us. We'll diagnose the issue, remove any malware, optimize your system and advise on the most cost-effective upgrade path.`,
        tags: ["Windows", "Performance", "Tips"],
        published: true,
      },
      {
        title: "What to Do When Your Computer Won't Turn On",
        slug: "what-to-do-computer-wont-turn-on",
        content: `## Don't panic — most power issues are fixable\n\nA computer that won't turn on is one of the most alarming things that can happen. But in our experience at Alphatech, the majority of these cases are not as serious as they first appear.\n\n## For laptops: try these first\n\n- Remove the charger, hold the power button for 30 seconds, then reconnect and try again\n- Try a different charger if you have one — a faulty charger is a common cause\n- Check the charging port for dust or debris\n- If the charging light comes on but the screen stays black, try pressing Fn + F8 (or similar) to toggle the display\n\n## For desktops: try these first\n\n- Check all the cables — power cable, monitor cable, and power strip switch\n- Try a different power outlet\n- Listen for any beeps when you press power — these are diagnostic codes\n- Check if any fans spin at all when you press the button\n\n## What the symptoms tell us\n\n- Nothing happens at all: power supply, charging port, or motherboard issue\n- Fans spin but no display: RAM, GPU, or BIOS issue\n- Starts then immediately shuts off: overheating or power supply problem\n- Blue screen then restart: Windows or driver issue\n\n## Data safety\n\nIf your computer won't turn on, your data is almost certainly still safe on the hard drive or SSD. Even if the motherboard is completely dead, we can usually recover your files.\n\n## Bring it to Alphatech\n\nDon't attempt to open your laptop or desktop yourself if you're not experienced — you could cause further damage. Bring it to us for a free diagnosis. We'll tell you exactly what's wrong and what it will cost to fix before any work begins.`,
        tags: ["Troubleshooting", "Repairs", "Tips"],
        published: true,
      },
    ];

    for (const post of blogPosts) {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: {},
        create: {
          ...post,
          authorId: admin.id,
          publishedAt: new Date(),
        },
      });
    }
    console.log(`✓ ${blogPosts.length} sample blog posts seeded`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

