interface TreeNode {
  type: "file" | "directory"; //since we have wo types mentioned in the json data
  name: string;
  size?: string;
  lastModified?: string;
  children?: TreeNode[];
}

// Function to toggle node visibility
function toggleNode(nodeElement: TreeNode) {
  const ul = nodeElement.querySelector("ul");
  if (ul) {
    ul.style.display = ul.style.display === "none" ? "block" : "none";
  }
}

// Function to recursively make all parent nodes visible
function makeParentsVisible(nodeElement: HTMLElement | null) {
  if (nodeElement?.tagName === "LI") {
    const parentUl = nodeElement.parentElement; // Parent UL
    const parentLi = parentUl?.parentElement; // Parent LI
    if (parentUl && parentUl.tagName === "UL") {
      parentUl.style.display = "block"; // Make the parent UL visible
    }
    if (parentLi && parentLi.tagName === "LI") {
      makeParentsVisible(parentLi); // Recursively make parent LI visible
    }
  }
}

// Function to render the main Tree
async function renderTree(container: HTMLElement, data: TreeNode) {
  const ul = document.createElement("ul");
  ul.classList.add("tree");

  function createTreeNode(node: TreeNode) {
    const li = document.createElement("li");
    li.classList.add("tree-item");

    // Create an icon
    const icon = document.createElement("span");
    icon.classList.add("icon");
    icon.textContent = node.type === "directory" ? "📂" : "📄";

    // Create a label
    const label = document.createElement("span");
    label.classList.add("label");
    label.textContent = node.name;

    li.appendChild(icon);
    li.appendChild(label);

    // Attach data to the element for reference
    li.dataset.nodeInfo = JSON.stringify(node);

    if (node.type === "directory" && node.children) {
      const ul = document.createElement("ul");
      ul.style.display = "none"; // Hidden by default

      node.children.forEach((child) => {
        ul.appendChild(createTreeNode(child));
      });

      li.appendChild(ul);

      // Attach the toggle functionality
      li.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleNode(li);
        console.log("Clicked Node:", JSON.parse(li.dataset.nodeInfo || "{}"));
      });
    } else {
      // Add click listener for file nodes
      li.addEventListener("click", (event) => {
        event.stopPropagation();
        console.log("Clicked Node:", JSON.parse(li.dataset.nodeInfo || "{}"));
      });
    }

    return li;
  }

  ul.appendChild(createTreeNode(data));
  container.innerHTML = ""; // Clear existing content
  container.appendChild(ul);
}

// Function to search the tree for matching nodes
function searchTree(node: TreeNode, searchTerm: string | undefined) {
  if (node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    return node;
  }

  if (node.children) {
    const filteredChildren = node.children
      .map((child) => searchTree(child, searchTerm))
      .filter((child) => child !== null);

    if (filteredChildren.length > 0) {
      return { ...node, children: filteredChildren };
    }
  }

  return null;
}

// Fetch JSON data
async function fetchData() {
  const container = document.getElementById("tree-container");
  const searchBar = document.getElementById("search-text");
  const searchButton = document.getElementById("search-btn");

  if (container) {
    const response = await fetch("data.json");
    const jsonData = await response.json();

    // Render the initial tree
    renderTree(container, jsonData.root);

    // Add search functionality
    searchButton?.addEventListener("click", () => {
      const searchTerm = searchBar?.value?.trim();
      // console.log(searchTerm);

      // Perform the search
      const filteredTree = searchTree(jsonData.root, searchTerm);

      if (filteredTree) {
        console.log(filteredTree.children);
        renderTree(container, filteredTree); // Render the filtered tree

        // Highlight and expand the matching nodes
        const allNodes = container.querySelectorAll("li.tree-item");
        allNodes.forEach((node) => {
          const nodeData = JSON.parse(node.dataset.nodeInfo || "{}");
          if (nodeData.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            node.scrollIntoView({ behavior: "smooth", block: "center" });
            makeParentsVisible(node as HTMLElement); // Ensure all parents are visible
          }
        });
      } else {
        container.innerHTML = "<p>No matches found</p>"; // Show no results message
      }
    });
  }
}

fetchData();
