interface TreeNode {
  type: "file" | "directory"; //since we have wo types mentioned in the json data
  name: string;
  size?: string;
  lastModified?: string;
  children?: TreeNode[];
}

//function to render the main Tree
async function renderTree(container: HTMLElement, data: TreeNode) {
  const ul = document.createElement("ul");
  ul.classList.add("tree");

  function createTreeNode(node: TreeNode): HTMLElement {
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

    if (node.type === "directory" && node.children) {
      const ul = document.createElement("ul");
      ul.style.display = "none"; // Hidden by default

      node.children.forEach((child) => {
        ul.appendChild(createTreeNode(child));
      });

      li.appendChild(ul);

      // Expand/collapse functionality
      li.addEventListener("click", (event) => {
        event.stopPropagation();
        ul.style.display = ul.style.display === "none" ? "block" : "none";
      });
    }

    return li;
  }

  ul.appendChild(createTreeNode(data));
  container.appendChild(ul);
}

// Fetch JSON data
async function fetchData() {
  const container = document.getElementById("tree-container");
  if (container) {
    const response = await fetch("data.json");
    const jsonData = await response.json();
    await renderTree(container, jsonData.root);
  }
}

fetchData();
