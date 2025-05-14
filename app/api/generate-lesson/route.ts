import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, subject, gradeLevel, prompt } = await req.json();
    
    // Validate required fields
    if (!title || !subject || !gradeLevel || !prompt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would call an AI service like OpenAI
    // For now, we'll create a mock response
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a mock lesson
    const generatedContent = {
      title,
      subject,
      gradeLevel,
      objectives: `By the end of this lesson, students will be able to:
- Understand key concepts related to ${title}
- Apply learned techniques in solving ${subject} problems
- Analyze and evaluate ${subject} scenarios`,
      content: `## Introduction to ${title}

This lesson introduces students to the fundamental concepts of ${title} in the context of ${subject}. The content is designed for ${gradeLevel} students and builds upon their existing knowledge.

### Key Concepts

1. **First Important Concept**
   - Detail about this concept
   - How it relates to ${subject}

2. **Second Important Concept**
   - Explanation with examples
   - Practical applications

3. **Third Important Concept**
   - Theoretical framework
   - Real-world connections

### Teaching Approach

The lesson uses a blend of direct instruction, guided practice, and collaborative learning to engage students with different learning styles.`,
      activities: `## Classroom Activities

### Warm-up Activity (10 minutes)
Students will brainstorm what they already know about ${title} in small groups and share with the class.

### Main Activity (25 minutes)
Students will work through a series of scaffolded problems that explore the key concepts of the lesson.

### Extension Activity (15 minutes)
For students who finish early or need additional challenge, provide more complex problems that require deeper application of the concepts.

### Conclusion (10 minutes)
Class discussion to summarize learning and address any questions or misconceptions.

## Assessment
- Formative assessment through observation during activities
- Exit ticket with 3-5 questions to check understanding
- Homework assignment that reinforces key concepts`
    };
    
    return NextResponse.json(generatedContent);
    
  } catch (error) {
    console.error("Error generating lesson:", error);
    return NextResponse.json(
      { error: "Failed to generate lesson" },
      { status: 500 }
    );
  }
}
