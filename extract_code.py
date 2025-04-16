import os
import re
import argparse

def extract_title_from_file(file_content):
    """Extract title from React file content (looking for comments or component name)."""
    # Look for comment titles like /* Title */ or // Title
    comment_title = re.search(r'/\*\s*(.*?)\s*\*/', file_content, re.DOTALL)
    if not comment_title:
        comment_title = re.search(r'//\s*(.*?)\s*\n', file_content)
    
    if comment_title:
        return comment_title.group(1).strip()
    
    # Look for component name as fallback
    component_match = re.search(r'function\s+(\w+)|const\s+(\w+)\s*=|class\s+(\w+)', file_content)
    if component_match:
        return component_match.group(1) or component_match.group(2) or component_match.group(3)
    
    return "Untitled Component"

def process_react_files(root_dir, output_file):
    """Process all React files recursively and write to output file."""
    react_extensions = ('.js', '.jsx', '.ts', '.tsx','.css')
    processed_count = 0
    error_count = 0
    
    with open(output_file, 'w', encoding='utf-8') as out_f:
        for root, dirs, files in os.walk(root_dir, topdown=True):
            # Skip common directories that shouldn't be processed
            dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'dist', 'build', '__pycache__'}]
            
            for file in files:
                if file.endswith(react_extensions):
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, root_dir)
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as in_f:
                            content = in_f.read()
                            title = extract_title_from_file(content)
                            
                            # Write to output file
                            out_f.write(f"=== {title} ===\n")
                            out_f.write(f"File Path: {relative_path}\n\n")
                            out_f.write(content)
                            out_f.write("\n\n" + "="*50 + "\n\n")
                            
                            processed_count += 1
                            print(f"Processed ({processed_count}): {relative_path}")
                    except UnicodeDecodeError:
                        try:
                            # Try with different encoding if utf-8 fails
                            with open(file_path, 'r', encoding='latin-1') as in_f:
                                content = in_f.read()
                                title = extract_title_from_file(content)
                                
                                out_f.write(f"=== {title} ===\n")
                                out_f.write(f"File Path: {relative_path}\n\n")
                                out_f.write(content)
                                out_f.write("\n\n" + "="*50 + "\n\n")
                                
                                processed_count += 1
                                print(f"Processed with latin-1 ({processed_count}): {relative_path}")
                        except Exception as e:
                            error_count += 1
                            print(f"Error processing {file_path}: {str(e)}")
                    except Exception as e:
                        error_count += 1
                        print(f"Error processing {file_path}: {str(e)}")

    return processed_count, error_count

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Extract React code to a single file.')
    parser.add_argument('root_dir', help='Root directory to scan for React files')
    parser.add_argument('-o', '--output', default='react_code_collection.txt',
                       help='Output filename (default: react_code_collection.txt)')
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.root_dir):
        print(f"Error: The specified directory does not exist: {args.root_dir}")
        return
    
    print(f"\nStarting processing of React files in {args.root_dir}...\n")
    processed_count, error_count = process_react_files(args.root_dir, args.output)
    
    print(f"\nProcessing complete!")
    print(f"Total files processed: {processed_count}")
    print(f"Errors encountered: {error_count}")
    print(f"\nAll React code has been extracted to {args.output}")

if __name__ == "__main__":
    main()